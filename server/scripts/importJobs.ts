import * as XLSX from 'xlsx';
import { readFileSync } from 'fs';
import { db } from '../db';
import { jobs } from '../../shared/schema';

export async function importJobsFromExcel(filePath: string) {
  try {
    console.log(`Reading Excel file: ${filePath}`);
    
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`Found ${rawData.length} rows in Excel file`);
    
    // Process and insert jobs
    let imported = 0;
    let skipped = 0;
    
    for (const row of rawData as any[]) {
      try {
        // Map Excel columns to database fields
        const jobData = {
          title: row['Job Title'] || row['Title'] || row['title'] || 'Unknown Position',
          company: row['Company'] || row['company'] || 'Unknown Company',
          location: row['Location'] || row['location'] || null,
          description: row['Description'] || row['description'] || null,
          salary: row['Salary'] || row['salary'] || null,
          url: row['URL'] || row['url'] || row['Job URL'] || row['Link'] || null,
          platform: 'Admin Upload',
          externalId: `admin-${Date.now()}-${imported}`,
          matchScore: null,
          isApplied: false
        };
        
        // Skip if no valid title or company
        if (!jobData.title || jobData.title === 'Unknown Position' || 
            !jobData.company || jobData.company === 'Unknown Company') {
          console.log(`Skipping invalid row:`, row);
          skipped++;
          continue;
        }
        
        // Insert into database
        await db.insert(jobs).values(jobData);
        imported++;
        
        console.log(`Imported: ${jobData.title} at ${jobData.company}`);
        
      } catch (error) {
        console.error('Error processing row:', row, error);
        skipped++;
      }
    }
    
    console.log(`Import complete: ${imported} imported, ${skipped} skipped`);
    return { imported, skipped, total: rawData.length };
    
  } catch (error) {
    console.error('Error importing jobs from Excel:', error);
    throw error;
  }
}