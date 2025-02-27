import { task } from "@langchain/langgraph";
import { llm } from "../llm-model/model";

export const content = task(
  "generateContent",
  async ({ resumeText, jobDescription }) => {
    const msg =
      await llm.invoke(`You are an expert resume parser. Extract information from the provided resume text and format it into the following YAML structure. Do not include any additional text, instructions, feedback, or commentary. The output must be pure YAML, strictly adhering to the formatting rules below.

### Rules:
1. **Strict Formatting**: Output must match the exact structure provided, including indentation, keys, and syntax.
   - Use 2 spaces for indentation.
   - Use - for list items and maintain proper indentation.
   - Use | for multi-line text blocks and maintain proper indentation.
   - Use > for single-line folded text.
2. **Accuracy**: Extract information as accurately as possible from the resume text.
3. **Defaults**: If a section is missing in the resume, set its value to False or leave it blank.
4. **No Extra Text**: Do not include any preamble, explanations, or comments outside the YAML structure.

### Example of Expected YAML Structure:
sidebar:
  about: False
  education: False
  name: John Doe
  tagline: Senior Software Engineer
  avatar: profile.jpg
  email: john.doe@example.com
  citizenship: False
  timezone: False
  linkedin: john-doe
  github: johndoe
  pdf: False
  languages:
    title: Languages
    info:
    - idiom: English
      level: Native
    - idiom: Spanish
      level: Intermediate
  interests:
    title: Interests
    info:
    - item: AI/ML
      link: False
    - item: Gaming
      link: False
  certificates:
    - item: AWS Certified Developer
      link: https://www.certificates.com/aws
      organization: Amazon Web Services
      date: 2022-05-01
career-profile:
  title: Career Profile
  summary: |
    Senior Software Engineer with 10+ years of experience in designing and developing scalable applications.
education:
  title: Education
  info:
  - degree: Bachelor of Science in Computer Science
    university: University of California
    time: 2010 - 2014
    details: |
      Graduated with honors.
experiences:
  title: Experiences
  info:
  - role: Senior Software Engineer
    time: 2018 - Present
    company: TechCorp
    details: |
      Led a team of 5 developers to build microservices-based applications.
  - role: Software Engineer
    time: 2014 - 2018
    company: Innovate Inc.
    details: |
      Developed REST APIs and optimized database queries.
projects:
  title: Projects
  intro: >
    Key projects I have worked on.
  assignments:
    - title: Ride Sharing Platform
      link: https://ridesharing.com
      tagline: A ride-sharing application with real-time tracking.
      technologies: Node.js, React.js, PostgreSQL
publications:
  title: Publications
  intro: |
    Research papers and articles.
  papers:
    - title: Scalable Microservices Architecture
      link: https://papers.com/scalable-microservices
      authors: John Doe, Jane Smith
      conference: International Conference on Software Engineering
skills:
  title: Skills & Proficiency
  toolset:
    - name: JavaScript
      level: Expert
    - name: Python
      level: Intermediate
footer: >
  Thank you for reviewing my profile.

### Input:
Here is the resume content:
${resumeText}

### Output:
Provide the extracted information in the exact YAML structure above. Do not include anything else.`);
    return msg.content;
  }
);
