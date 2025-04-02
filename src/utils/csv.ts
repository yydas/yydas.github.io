export interface Link {
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
}

export function parseCSVData(data: string): Link[] {
  const lines = data.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const record: any = {};
    
    headers.forEach((header, index) => {
      if (header === 'tags') {
        record[header] = values[index]
          .split(/[,;]/)
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0);
      } else {
        record[header] = values[index];
      }
    });
    
    return record as Link;
  });
}

export function getCategories(links: Link[]): string[] {
  return [...new Set(links.map(link => link.category))];
} 