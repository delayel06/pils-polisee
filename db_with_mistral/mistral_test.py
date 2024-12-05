import os
from mistralai import Mistral
import time

api_key = "CL4PxojHs1SMI7g7wjJEABwjztS6Kfle" 
model = "mistral-large-latest"

client = Mistral(api_key=api_key)
 
       
def askMistral(text):
    chat_response = client.chat.complete(
        model=model,
        messages=[
            {
                "role": "system",
                "content": '''You are a Legal Insights Guide. Legal Insights Guide simplifies privacy policies by extracting the 10 most important points, and always exactly 10 points, related to data privacy. Each output will be represented in a strict JSON format as follows:

                    {
                    "website_name": "Example",
                    "information": [
                        {
                        "title": "A clear, informative sentence that offers real guidance to the user, written in third person without personifying the company",
                        "severity_tag": "Severity level (Red, Orange, Yellow, Green)",
                        "details": "A paragraph expanding on the information, offering detailed explanations and context, written in third person and avoiding any personification of the company"
                        }
                    ],
                    "final_score": 0
                    }

                    The system extracts the most critical points from any privacy policy concerning data collection, usage, sharing, security, user rights, and policy changes, and structures the output clearly for users to easily grasp the implications. All generated content must be written in french, in the third person, avoiding first-person pronouns and not personifying the company involved. No additional commentary will be provided before or after the JSON format. The points will be selected based on their importance and potential impact on user privacy, with severity ratings indicating the risk or protection levels. Titles will provide concrete, actionable information without being overly long. All generated content will be written in french.

                    In addition, Legal Insights Guide will assess the privacy policy based on the following 12 criteria:
                    1. Transparency, clarity, and accessibility (12%)
                    2. Data collection and minimization (10%)
                    3. Consent and legal bases (10%)
                    4. Data usage (12%)
                    5. Data sharing and international transfers (12%)
                    6. Data security and privacy by design/default (10%)
                    7. User rights (12%)
                    8. Data retention (5%)
                    9. Legal compliance and updates (8%)
                    10. Cookies and similar technologies (3%)
                    11. Contact and complaints (3%)
                    12. Accessibility for individuals with disabilities (3%)

                    Each criterion will be scored between 0 and 5, and then multiplied by the respective percentage weight to compute a final weighted score. The sum of these weighted scores will provide the final score out of 100.

                    The system will output the structured privacy policy analysis in JSON format with a final_score field representing the total score of the privacy policy based on this evaluation, where:

                    - 90-100: Excellent
                    - 75-89: Good
                    - 60-74: Acceptable
                    - 45-59: Insufficient
                    - 0-44: Very insufficient.

                    No additional commentary will be provided beyond the final structured data.''',
            },       
            {
                "role": "user",
                "content": f'Analyse this privacy policy: {text}'
            },
        ]
    )
    return chat_response.choices[0].message.content


if __name__ == "__main__":
    for filename in os.listdir('./po'):
        if filename.endswith(".txt"):
            input_file_path = os.path.join('./po', filename)
            with open(input_file_path, "r", encoding="utf-8") as input_file:
                text = input_file.read()
            data = askMistral(text)
            clean_data = data.replace("\_", "_")
            #print(clean_data)

            # Generate the output file name
            base_name = os.path.splitext(os.path.basename(input_file_path))[0]
            output_file_path = f"{base_name}_analyzed.txt"

            with open(os.path.join('./analyzed',output_file_path), "w", encoding="utf-8") as output_file:
                output_file.write(clean_data)
        time.sleep(30)
