import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

interface ScrapedJob {
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  jobUrl: string;
  applyUrl?: string;
  platform: string;
  postedDate?: string;
  jobType?: string;
}

interface JobSearchParams {
  query: string;
  location?: string;
  limit?: number;
}

export class JobScrapingService {
  private userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  async searchJobs(params: JobSearchParams): Promise<ScrapedJob[]> {
    const results: ScrapedJob[] = [];
    
    try {
      // Scrape from multiple sources in parallel
      const [indeedJobs, remoteOkJobs, weworkRemotelyJobs] = await Promise.allSettled([
        this.scrapeIndeed(params),
        this.scrapeRemoteOK(params),
        this.scrapeWeWorkRemotely(params)
      ]);

      // Combine results from all successful scrapes
      if (indeedJobs.status === 'fulfilled') {
        results.push(...indeedJobs.value);
      }
      if (remoteOkJobs.status === 'fulfilled') {
        results.push(...remoteOkJobs.value);
      }
      if (weworkRemotelyJobs.status === 'fulfilled') {
        results.push(...weworkRemotelyJobs.value);
      }

      console.log(`Scraped ${results.length} jobs from all sources`);
      return results.slice(0, params.limit || 20);
      
    } catch (error) {
      console.error('Job scraping error:', error);
      return [];
    }
  }

  private async scrapeIndeed(params: JobSearchParams): Promise<ScrapedJob[]> {
    try {
      const searchUrl = `https://www.indeed.com/jobs?q=${encodeURIComponent(params.query)}&l=${encodeURIComponent(params.location || '')}`;
      
      const response = await axios.get(searchUrl, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const jobs: ScrapedJob[] = [];

      $('.job_seen_beacon, [data-jk]').each((_, element) => {
        try {
          const $job = $(element);
          const title = $job.find('h2 a span, .jobTitle a span').first().text().trim();
          const company = $job.find('.companyName, [data-testid="company-name"]').text().trim();
          const location = $job.find('.companyLocation, [data-testid="job-location"]').text().trim();
          const description = $job.find('.job-snippet, .summary').text().trim();
          const jobUrl = $job.find('h2 a, .jobTitle a').attr('href');
          const salary = $job.find('.salary-snippet, .estimated-salary').text().trim();

          if (title && company && jobUrl) {
            const fullUrl = jobUrl.startsWith('http') ? jobUrl : `https://www.indeed.com${jobUrl}`;
            const applyUrl = fullUrl; // Indeed apply URLs are typically the same as job URLs

            jobs.push({
              title,
              company,
              location: location || 'Not specified',
              description: description.substring(0, 300),
              salary: salary || undefined,
              jobUrl: fullUrl,
              applyUrl,
              platform: 'Indeed',
              postedDate: $job.find('.date').text().trim() || undefined
            });
          }
        } catch (err) {
          console.log('Error parsing Indeed job:', err);
        }
      });

      console.log(`Scraped ${jobs.length} jobs from Indeed`);
      return jobs.slice(0, 10);
      
    } catch (error) {
      console.error('Indeed scraping error:', error);
      return [];
    }
  }

  private async scrapeRemoteOK(params: JobSearchParams): Promise<ScrapedJob[]> {
    try {
      const searchUrl = `https://remoteok.io/remote-${encodeURIComponent(params.query.toLowerCase().replace(/\s+/g, '-'))}-jobs`;
      
      const response = await axios.get(searchUrl, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const jobs: ScrapedJob[] = [];

      $('.job').each((_, element) => {
        try {
          const $job = $(element);
          const title = $job.find('.company h2').text().trim();
          const company = $job.find('.company h3').text().trim();
          const location = 'Remote';
          const description = $job.find('.description').text().trim();
          const salary = $job.find('.salary').text().trim();
          const applyUrl = $job.find('.apply').attr('href') || $job.find('a').attr('href');

          if (title && company && applyUrl) {
            const fullApplyUrl = applyUrl.startsWith('http') ? applyUrl : `https://remoteok.io${applyUrl}`;

            jobs.push({
              title,
              company,
              location,
              description: description.substring(0, 300),
              salary: salary || undefined,
              jobUrl: fullApplyUrl,
              applyUrl: fullApplyUrl,
              platform: 'RemoteOK',
              jobType: 'Remote'
            });
          }
        } catch (err) {
          console.log('Error parsing RemoteOK job:', err);
        }
      });

      console.log(`Scraped ${jobs.length} jobs from RemoteOK`);
      return jobs.slice(0, 5);
      
    } catch (error) {
      console.error('RemoteOK scraping error:', error);
      return [];
    }
  }

  private async scrapeWeWorkRemotely(params: JobSearchParams): Promise<ScrapedJob[]> {
    try {
      const searchUrl = `https://weworkremotely.com/remote-jobs/search?term=${encodeURIComponent(params.query)}`;
      
      const response = await axios.get(searchUrl, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const jobs: ScrapedJob[] = [];

      $('.jobs li').each((_, element) => {
        try {
          const $job = $(element);
          const $link = $job.find('a');
          const company = $job.find('.company').text().trim();
          const title = $job.find('.title').text().trim();
          const location = 'Remote';
          const jobUrl = $link.attr('href');

          if (title && company && jobUrl) {
            const fullUrl = jobUrl.startsWith('http') ? jobUrl : `https://weworkremotely.com${jobUrl}`;

            jobs.push({
              title,
              company,
              location,
              description: `Remote ${title} position at ${company}`,
              jobUrl: fullUrl,
              applyUrl: fullUrl,
              platform: 'We Work Remotely',
              jobType: 'Remote'
            });
          }
        } catch (err) {
          console.log('Error parsing WeWorkRemotely job:', err);
        }
      });

      console.log(`Scraped ${jobs.length} jobs from We Work Remotely`);
      return jobs.slice(0, 5);
      
    } catch (error) {
      console.error('WeWorkRemotely scraping error:', error);
      return [];
    }
  }

  async getJobDetails(jobUrl: string): Promise<{ description: string; applyUrl?: string } | null> {
    try {
      const response = await axios.get(jobUrl, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 15000
      });

      const $ = cheerio.load(response.data);
      
      // Extract detailed description
      const description = $('.jobsearch-jobDescriptionText, .job-description, .description, #jobDescriptionText')
        .first()
        .text()
        .trim()
        .substring(0, 1000);

      // Look for apply buttons/links
      const applyUrl = $(
        'a[href*="apply"], a[href*="application"], .apply-button, .applyButtonLinkContainer a, #applyButtonLinkContainer a'
      ).attr('href');

      return {
        description: description || 'Job description not available',
        applyUrl: applyUrl ? (applyUrl.startsWith('http') ? applyUrl : jobUrl) : undefined
      };
      
    } catch (error) {
      console.error('Error getting job details:', error);
      return null;
    }
  }

  async intelligentJobMatch(userProfile: any, jobs: ScrapedJob[]): Promise<ScrapedJob[]> {
    // Simple keyword matching for now - can be enhanced with AI
    const userSkills = userProfile?.skills?.toLowerCase() || '';
    const userTitle = userProfile?.desiredTitle?.toLowerCase() || '';
    
    return jobs.map(job => {
      let matchScore = 0;
      const jobText = `${job.title} ${job.description}`.toLowerCase();
      
      // Title match
      if (userTitle && jobText.includes(userTitle)) {
        matchScore += 40;
      }
      
      // Skills match
      if (userSkills) {
        const skills = userSkills.split(',').map(s => s.trim());
        skills.forEach(skill => {
          if (skill && jobText.includes(skill)) {
            matchScore += 15;
          }
        });
      }
      
      // Platform bonus
      if (job.platform === 'Indeed') matchScore += 5;
      if (job.jobType === 'Remote') matchScore += 10;
      
      return {
        ...job,
        matchScore: Math.min(matchScore, 95)
      };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }
}