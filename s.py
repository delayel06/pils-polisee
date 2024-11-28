import requests
from bs4 import BeautifulSoup
import csv
from urllib.parse import urljoin, urlparse

def find_terms_link(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        terms_texts = ['terms', 'tos', 'terms of service', 'terms of use', 'conditions', 'legal', 'privacy']
        
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            text = link.text.lower()
            
            if any(term in text or term in href.lower() for term in terms_texts):
                return urljoin(url, href)
        
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
        possible_paths = ['/terms', '/tos', '/terms-of-service', '/legal', '/privacy']
        
        for path in possible_paths:
            test_url = urljoin(base_url, path)
            try:
                test_response = requests.get(test_url, headers=headers, timeout=5)
                if test_response.status_code == 200:
                    return test_url
            except:
                continue
        
        return None
    except Exception as e:
        print(f"Error processing {url}: {str(e)}")
        return None

def main():
    websites = [
        'https://www.google.com',
        'https://www.facebook.com',
        'https://www.amazon.com',
        'https://www.apple.com',
        'https://www.microsoft.com',
        'https://www.twitter.com',
        'https://www.x.com',
        'https://www.instagram.com',
        'https://www.linkedin.com',
        'https://www.netflix.com',
        'https://www.youtube.com',
        'https://www.whatsapp.com',
        'https://www.zoom.us',
        'https://www.reddit.com',
        'https://www.pinterest.com',
        'https://www.spotify.com',
        'https://www.wikipedia.org',
        'https://www.ebay.com',
        'https://www.paypal.com',
        'https://www.tumblr.com',
        'https://www.adobe.com',
        'https://www.imgur.com',
        'https://www.bing.com',
        'https://www.wordpress.com',
        'https://www.stackoverflow.com',
        'https://www.github.com',
        'https://www.yahoo.com',
        'https://www.blogger.com',
        'https://www.microsoftonline.com',
    ]
    
    results = []
    
    for site in websites:
        print(f"Processing {site}...")
        terms_link = find_terms_link(site)
        results.append((site, terms_link))
    
    with open('terms_and_conditions_links.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Website', 'Terms and Conditions Link'])
        writer.writerows(results)
    
    print("Scraping completed. Results saved to 'terms_and_conditions_links.csv'")

if __name__ == "__main__":
    main()