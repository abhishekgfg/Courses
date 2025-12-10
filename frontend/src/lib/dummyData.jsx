
import drAnkushImage from "../assets/dr-ankush.jpg";
import drPragyaImage from "../assets/dr-pragya.jpg";

export const courses = [
    {
        id: "autism-starter",
        slug: "autism-starter-guide",
        title: "Understanding Your Child's Autism Profile",
        shortDescription: "Learn to understand your child's unique autism profile and build a realistic roadmap for support.",
        category: "Autism & ADHD",
        level: "Intro",
        isFree: true,
        isPremium: false,
        duration: "2.5 hours",
        moduleCount: 8,
        thumbnail: "/placeholder.svg",
        instructor: "Dr. Ankush Garg",
        price: 0,
        outcomes: [
            "Understand the core features of autism spectrum",
            "Identify your child's unique strengths and challenges",
            "Create a personalized support roadmap",
            "Learn evidence-based home strategies",
            "Build confidence in your parenting approach"
        ],
        modules: [
            {
                id: "m1",
                title: "What is Autism Really?",
                lessons: [
                    { id: "l1", title: "Beyond the Label: Understanding Autism", type: "video", duration: "8 min" },
                    { id: "l2", title: "The Autism Spectrum Explained", type: "video", duration: "10 min" },
                    { id: "l3", title: "Common Myths vs Reality", type: "video", duration: "7 min" }
                ]
            },
            {
                id: "m2",
                title: "Recognizing Your Child's Profile",
                lessons: [
                    { id: "l4", title: "Sensory Patterns in Autism", type: "video", duration: "12 min" },
                    { id: "l5", title: "Communication Styles", type: "video", duration: "10 min" },
                    { id: "l6", title: "Social Understanding", type: "video", duration: "9 min" }
                ]
            },
            {
                id: "m3",
                title: "Building Your Support Plan",
                lessons: [
                    { id: "l7", title: "Creating a Roadmap", type: "video", duration: "15 min" },
                    { id: "l8", title: "Next Steps", type: "video", duration: "8 min" }
                ]
            }
        ]
    },
    {
        id: "adhd-focus",
        slug: "adhd-focus-strategies",
        title: "ADHD: From Chaos to Clarity",
        shortDescription: "Practical strategies to help your child focus, organize, and thrive with ADHD.",
        category: "Autism & ADHD",
        level: "Deep-dive",
        isFree: false,
        isPremium: true,
        duration: "4 hours",
        moduleCount: 12,
        thumbnail: "/placeholder.svg",
        instructor: "Dr. Pragya Goel",
        price: 1999,
        outcomes: [
            "Understand ADHD brain differences",
            "Master home routines that work",
            "Reduce daily meltdowns and frustrations",
            "Improve homework and school success",
            "Build your child's self-esteem"
        ],
        modules: []
    },
    {
        id: "parent-mindset",
        slug: "resilient-parent-mindset",
        title: "The Resilient Parent Mindset",
        shortDescription: "Build emotional strength and clarity as you navigate your parenting journey.",
        category: "Parent Mindset",
        level: "Intro",
        isFree: true,
        isPremium: false,
        duration: "1.5 hours",
        moduleCount: 6,
        thumbnail: "/placeholder.svg",
        instructor: "Dr. Pragya Goel",
        price: 0,
        outcomes: [
            "Manage parental stress and overwhelm",
            "Build emotional resilience",
            "Practice self-compassion",
            "Set healthy boundaries",
            "Find your support community"
        ],
        modules: []
    },
    {
        id: "teen-mental-health",
        slug: "supporting-teen-mental-health",
        title: "Supporting Your Teen's Mental Health",
        shortDescription: "Navigate teen anxiety, depression, and emotional struggles with expert guidance.",
        category: "Teen Mental Health",
        level: "Deep-dive",
        isFree: false,
        isPremium: true,
        duration: "3.5 hours",
        moduleCount: 10,
        thumbnail: "/placeholder.svg",
        instructor: "Dr. Pragya Goel",
        price: 2499,
        outcomes: [
            "Recognize signs of teen mental health struggles",
            "Open communication channels with your teen",
            "Know when to seek professional help",
            "Support without overwhelming",
            "Build trust and connection"
        ],
        modules: []
    },
    {
        id: "behaviour-basics",
        slug: "behaviour-basics-for-parents",
        title: "Behaviour Basics: Understanding Meltdowns",
        shortDescription: "Learn why meltdowns happen and how to respond with calm confidence.",
        category: "Behaviour & Emotions",
        level: "Intro",
        isFree: true,
        isPremium: false,
        duration: "1 hour",
        moduleCount: 4,
        thumbnail: "/placeholder.svg",
        instructor: "Dr. Ankush Garg",
        price: 0,
        outcomes: [
            "Understand the root causes of meltdowns",
            "Learn de-escalation techniques",
            "Create prevention strategies",
            "Respond without judgment",
            "Track patterns and triggers"
        ],
        modules: []
    },
    {
        id: "chronic-stress",
        slug: "managing-chronic-stress",
        title: "Managing Chronic Stress in Special Needs Parenting",
        shortDescription: "Sustainable strategies for parents dealing with long-term stress and challenges.",
        category: "Chronic Conditions & Stress",
        level: "Protocols",
        isFree: false,
        isPremium: true,
        duration: "3 hours",
        moduleCount: 9,
        thumbnail: "/placeholder.svg",
        instructor: "Dr. Pragya Goel",
        price: 1799,
        outcomes: [
            "Recognize signs of chronic stress",
            "Implement self-care protocols",
            "Build sustainable routines",
            "Prevent burnout",
            "Access community support"
        ],
        modules: []
    }
];

export const communityPosts = [
    {
        id: "post1",
        topic: "Autism & Behaviour",
        type: "Question",
        title: "How to handle meltdowns at school drop-off?",
        preview: "My 6-year-old has started having major meltdowns every morning when I drop him at school...",
        author: "Parent A",
        timeAgo: "2 hours ago",
        replies: 12,
        hasExpertReply: true
    },
    {
        id: "post2",
        topic: "ADHD & Focus",
        type: "Win",
        title: "He completed homework without a fight today!",
        preview: "After trying the timer technique from the course, we had our first peaceful homework session...",
        author: "Parent B",
        timeAgo: "5 hours ago",
        replies: 8,
        hasExpertReply: false
    },
    {
        id: "post3",
        topic: "Diet & Lifestyle",
        type: "Question",
        title: "Anyone tried diet changes for sensory issues?",
        preview: "I've heard about elimination diets helping with sensory sensitivities. Has anyone tried this?",
        author: "Parent C",
        timeAgo: "1 day ago",
        replies: 15,
        hasExpertReply: true
    },
    {
        id: "post4",
        topic: "Parent Emotions & Burnout",
        type: "Doubt",
        title: "Is it normal to feel this overwhelmed?",
        preview: "Some days I feel like I'm failing as a parent. Is this normal?",
        author: "Parent D",
        timeAgo: "1 day ago",
        replies: 24,
        hasExpertReply: true
    },
    {
        id: "post5",
        topic: "School & Academics",
        type: "Resource",
        title: "Great IEP meeting checklist I found",
        preview: "Sharing a comprehensive checklist that helped me prepare for my son's IEP meeting...",
        author: "Parent E",
        timeAgo: "2 days ago",
        replies: 6,
        hasExpertReply: false
    }
];

export const weeklyTasks = [
    {
        id: "task1",
        title: "Watch Module 1 of Autism Starter Course",
        completed: true
    },
    {
        id: "task2",
        title: "Fill Child Behaviour Tracker for 3 days",
        completed: true
    },
    {
        id: "task3",
        title: "Practice one calming technique daily",
        completed: false
    },
    {
        id: "task4",
        title: "Join a Community discussion",
        completed: false
    },
    {
        id: "task5",
        title: "Complete Parent Mindset assessment",
        completed: false
    }
];

export const freeResources = [
    {
        id: "res1",
        title: "Parent Clarity Quick Start",
        type: "Mini-course",
        description: "A 20-minute introduction to understanding your child's needs and your parenting journey.",
        thumbnail: "/placeholder.svg",
        url: "https://example.com/minicourse"
    },
    {
        id: "res2",
        title: "Daily Behaviour Tracker",
        type: "Form",
        description: "Track patterns in your child's behaviour to identify triggers and successes.",
        thumbnail: "/placeholder.svg",
        url: "https://manovaidya.in/patientsform.php"
    },
    {
        id: "res3",
        title: "Sensory Profile Checklist",
        type: "PDF",
        description: "Identify your child's sensory preferences and sensitivities.",
        thumbnail: "/placeholder.svg",
        url: "https://example.com/sensory"
    },
    {
        id: "res4",
        title: "Understanding Your Child's Brain",
        type: "Webinar",
        description: "Recorded expert session on neurodevelopmental differences and what they mean.",
        thumbnail: "/placeholder.svg",
        url: "https://example.com/webinar"
    },
    {
        id: "res5",
        title: "Behaviour Assessment Form",
        type: "Behaviour",
        description: "Fill this quick behaviour assessment to understand your child's patterns.",
        thumbnail: "/placeholder.svg",
        url: "https://manovaidya.in/patientsform.php"  // special link
    }
];


export const experts = [
    {
        id: "dr-ankush",
        name: "Dr. Ankush Garg",
        designation: "Ayurveda & Neuro-Mental Health Specialist",
        image: drAnkushImage,
        expertise: [
            "7+ years clinical experience in neurodevelopmental conditions",
            "Integrative approach combining Ayurveda and modern psychology",
            "Specialized in Autism, ADHD, and learning differences"
        ]
    },
    {
        id: "dr-pragya",
        name: "Dr. Pragya Goel",
        designation: "Clinical Psychologist & Parent Mental Health Expert",
        image: drPragyaImage,
        expertise: [
            "Expert in teen mental health and parent-child relationships",
            "Specialized in anxiety, depression, and emotional regulation",
            "Focus on parent well-being and resilience building"
        ]
    }
];

export const testimonials = [
    {
        id: "t1",
        text: "This course gave me the clarity I desperately needed. For the first time, I feel like I understand my son's autism and have a real plan forward.",
        author: "Mother of 5-year-old with autism",
        course: "Understanding Your Child's Autism Profile"
    },
    {
        id: "t2",
        text: "The ADHD strategies actually work! Homework time went from 3 hours of tears to 45 minutes of focused work.",
        author: "Mother of 9-year-old with ADHD",
        course: "ADHD: From Chaos to Clarity"
    },
    {
        id: "t3",
        text: "I was on the verge of burnout. This course helped me realize I need to take care of myself too. Game changer.",
        author: "Father of two neurodivergent children",
        course: "The Resilient Parent Mindset"
    }
];
