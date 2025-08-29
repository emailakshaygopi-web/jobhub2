import { storage } from "../storage";
import crypto from "crypto";

export interface AiRequestOptions {
  userId: string;
  operationType: 'resume_check' | 'resume_build' | 'cover_letter' | 'job_analysis' | 'company_research';
  inputData: any;
  forceRefresh?: boolean;
}

export interface AiUsageResult {
  canProceed: boolean;
  usageStatus: 'allowed' | 'limit_reached' | 'cache_hit';
  creditsRemaining: number;
  cachedResult?: any;
  requestHash?: string;
}

export class AiUsageService {
  private generateRequestHash(operationType: string, inputData: any): string {
    // Create a deterministic hash from operation type and input data
    const hashInput = JSON.stringify({ 
      type: operationType, 
      data: this.normalizeInput(inputData) 
    });
    return crypto.createHash('sha256').update(hashInput).digest('hex');
  }

  private normalizeInput(inputData: any): any {
    // Normalize input to ensure consistent hashing
    if (typeof inputData === 'string') {
      return inputData.trim().toLowerCase();
    }
    
    if (typeof inputData === 'object' && inputData !== null) {
      const normalized: any = {};
      Object.keys(inputData).sort().forEach(key => {
        normalized[key] = this.normalizeInput(inputData[key]);
      });
      return normalized;
    }
    
    return inputData;
  }

  async checkUsageAndCache(options: AiRequestOptions): Promise<AiUsageResult> {
    const { userId, operationType, inputData, forceRefresh = false } = options;
    
    // Admin user bypass - remove limits for main admin
    const ADMIN_USER_ID = '47005508'; // Akshay's user ID
    if (userId === ADMIN_USER_ID) {
      const requestHash = this.generateRequestHash(operationType, inputData);
      return {
        canProceed: true,
        usageStatus: 'allowed',
        creditsRemaining: 999999,
        requestHash,
      };
    }
    
    // Generate request hash for deduplication
    const requestHash = this.generateRequestHash(operationType, inputData);
    
    // Get user credits
    let userCredits = await storage.getUserCredits(userId);
    if (!userCredits) {
      userCredits = await storage.createUserCredits(userId);
    }
    
    // Reset daily usage if new day
    const today = new Date();
    const lastReset = new Date(userCredits.lastResetDate || today);
    if (today.toDateString() !== lastReset.toDateString()) {
      userCredits = await storage.resetDailyCredits(userId);
    }
    
    const creditsRemaining = (userCredits.dailyLimit || 5) - (userCredits.dailyUsed || 0);
    
    // Check if user has reached daily limit
    if (creditsRemaining <= 0 && userCredits.plan === 'free') {
      return {
        canProceed: false,
        usageStatus: 'limit_reached',
        creditsRemaining: 0,
      };
    }
    
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cachedResult = await storage.getCacheByHash(requestHash);
      if (cachedResult) {
        // Update cache access stats
        await storage.updateCacheAccess(requestHash);
        
        // Log cache hit
        await storage.createAiUsage({
          userId,
          operationType,
          requestHash,
          status: 'cached',
          tokensUsed: 0,
          costEstimate: 0,
        });
        
        return {
          canProceed: true,
          usageStatus: 'cache_hit',
          creditsRemaining,
          cachedResult: cachedResult.outputData,
          requestHash,
        };
      }
    }
    
    // User can proceed with new AI request
    return {
      canProceed: true,
      usageStatus: 'allowed',
      creditsRemaining: creditsRemaining - 1, // Subtract 1 for the upcoming request
      requestHash,
    };
  }

  async recordUsage(
    userId: string, 
    operationType: string, 
    requestHash: string, 
    outputData: any, 
    tokensUsed: number = 0
  ): Promise<void> {
    // Increment user's daily usage
    await storage.incrementDailyUsage(userId);
    
    // Record AI usage
    await storage.createAiUsage({
      userId,
      operationType,
      requestHash,
      status: 'completed',
      tokensUsed,
      costEstimate: Math.round(tokensUsed * 0.002), // Estimate: $0.002 per 1k tokens
    });
    
    // Cache the result for 24 hours
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    try {
      await storage.createCache({
        requestHash,
        operationType,
        inputData: {}, // We don't store input for privacy
        outputData,
        tokensUsed,
        expiresAt,
      });
    } catch (error) {
      // Cache creation failed, but usage is still recorded
      console.warn('Failed to cache AI result:', error);
    }
  }

  async recordFailure(
    userId: string, 
    operationType: string, 
    requestHash: string, 
    error: string
  ): Promise<void> {
    await storage.createAiUsage({
      userId,
      operationType,
      requestHash,
      status: 'failed',
      tokensUsed: 0,
      costEstimate: 0,
    });
  }

  async getUsageStats(userId: string): Promise<{
    dailyUsed: number;
    dailyLimit: number;
    monthlyUsed: number;
    monthlyLimit: number;
    totalUsed: number;
    cacheHitRate: number;
  }> {
    const userCredits = await storage.getUserCredits(userId);
    
    if (!userCredits) {
      return {
        dailyUsed: 0,
        dailyLimit: 5,
        monthlyUsed: 0,
        monthlyLimit: 150,
        totalUsed: 0,
        cacheHitRate: 0,
      };
    }
    
    // Calculate cache hit rate (simplified - could be more sophisticated)
    const cacheHitRate = 0.15; // Placeholder - would calculate from actual usage data
    
    return {
      dailyUsed: userCredits.dailyUsed || 0,
      dailyLimit: userCredits.dailyLimit || 5,
      monthlyUsed: userCredits.monthlyUsed || 0,
      monthlyLimit: userCredits.monthlyLimit || 150,
      totalUsed: userCredits.totalCreditsUsed || 0,
      cacheHitRate,
    };
  }
}

export const aiUsageService = new AiUsageService();