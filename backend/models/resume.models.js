import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({

    personalInfo: {
        photo:String,
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: false },
        linkedIn: { type: String, required: false },
        portfolio: { type: String, required: false },
        summary: { type: String, required: false }
    },
    experience: [{
        company: { type: String, required: true },
        position: { type: String, required: true },
        startDate: { type: String, required: true }, // Consider using Date type if storing as ISO date
        endDate: { type: String, required: false },  // Optional for current jobs
        current: { type: Boolean, default: false },
        description: { type: String, required: false }
    }],
    education: [{
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        field: { type: String, required: true },
        graduationDate: { type: String, required: true }, // Consider using Date type if storing as ISO date
        gpa: { type: String, required: false }
    }],
    projects: [{
        name: { type: String, required: true },
        description: { type: String, required: true },
        technologies: { type: String, required: false },
        link: { type: String, required: false }
    }],
    skills: {
        technical: { type: String, required: false },
        soft: { type: String, required: false },
        languages: { type: String, required: false }
    },
    certifications: [{
        name: { type: String, required: true },
        issuer: { type: String, required: true },
        date: { type: String, required: true }, // Consider using Date type if storing as ISO date
        link: { type: String, required: false }
    }],
    achievements: [{
        title: { type: String, required: true },
        description: { type: String, required: false },
        date: { type: String, required: false } // Consider using Date type if storing as ISO date
    }]
});

// Create the Resume model
const Resume = await mongoose.model('Resume', resumeSchema);

export default Resume;