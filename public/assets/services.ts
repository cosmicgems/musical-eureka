interface Feature {
    name: string,
    inclusion: boolean,
}

interface Features {
    name: string
}

interface Service {
    name: string,
    type: string,
    description: string,
    features : Feature [],

}

export const features: Features[] = [
    {
        name: 'Bureau Disputes/Challenges',
    },
    {
        name: 'Creditor Interventions',
    },
    {
        name: 'TransUnion FICO Score',
    },
    {
        name: 'Inquiry Assist',
    },
    {
        name: 'Debt Handler',
    },
    {
        name: 'Report Watch Alerts',
    },
]

export const services: Service[] = [
    {
        name: 'Starter Essentials',
        type: 'Fair',
        description: "Get started on your credit journey with our Starter Essentials package, offering fundamental tools to build a strong credit foundation.",
        features: [
            {
                name: 'Bureau Disputes/Challenges',
                inclusion: true
            },
            {
                name: 'Creditor Interventions',
                inclusion: true
            },
            {
                name: 'TransUnion FICO Score',
                inclusion: true
            },
            {
                name: 'Inquiry Assist',
                inclusion: true
            },
            {
                name: 'Debt Handling',
                inclusion: false
            },
            {
                name: 'Report Watch Alerts',
                inclusion: false
            },
        ]
    },
    {
        name: 'Pro Advantage',
        type: 'Fair',
        description: "Elevate your credit health with our Pro Advantage package, which includes advanced credit solutions to address challenges and improve your credit profile.",
        features: [
            {
                name: 'Bureau Disputes/Challenges',
                inclusion: true
            },
            {
                name: 'Creditor Interventions',
                inclusion: true
            },
            {
                name: 'TransUnion FICO Score',
                inclusion: true
            },
            {
                name: 'Inquiry Assist',
                inclusion: true
            },
            {
                name: 'Debt Handling',
                inclusion: true
            },
            {
                name: 'Report Watch Alerts',
                inclusion: false
            },
        ]
    },
    {
        name: 'Elite Excellence',
        type: 'Fair',
        description: "Experience credit excellence at the elite level with our Elite Excellence package, where top-tier services and personalized strategies lead to exceptional financial growth.",
        features: [
            {
                name: 'Bureau Disputes/Challenges',
                inclusion: true
            },
            {
                name: 'Creditor Interventions',
                inclusion: true
            },
            {
                name: 'TransUnion FICO Score',
                inclusion: true
            },
            {
                name: 'Inquiry Assist',
                inclusion: true
            },
            {
                name: 'Debt Handling',
                inclusion: true
            },
            {
                name: 'Report Watch Alerts',
                inclusion: true
            },
        ]
    },
]


export const businessServices: Service[] = [
    {
        name: 'Basic Business Boost',
        type: 'Fair',
        description: "Lay the foundation for your business credit journey with our Business Basic Boost package, providing essential tools to establish a solid credit footing.",
        features: [
            {
                name: 'Bureau Disputes/Challenges',
                inclusion: true
            },
            {
                name: 'Creditor Interventions',
                inclusion: true
            },
            {
                name: 'Inquiry Assist',
                inclusion: true
            },
            {
                name: 'ID Theft Insurance',
                inclusion: true
            },
            {
                name: 'Debt Handling',
                inclusion: true
            },
            {
                name: 'TransUnion FICO Score',
                inclusion: true
            },
            {
                name: 'Report Watch Alerts',
                inclusion: true
            },
        ]
    },
    {
        name: 'Business Pro Advantage',
        type: 'Fair',
        description: "Business Pro Advantage: Elevate your business credit health with our Business Pro Advantage package, which includes advanced credit solutions tailored to address challenges and enhance your business credit profile.",
        features: [
            {
                name: 'Bureau Disputes/Challenges',
                inclusion: true
            },
            {
                name: 'Creditor Interventions',
                inclusion: true
            },
            {
                name: 'Inquiry Assist',
                inclusion: true
            },
            {
                name: 'ID Theft Insurance',
                inclusion: true
            },
            {
                name: 'Debt Handling',
                inclusion: true
            },
            {
                name: 'TransUnion FICO Score',
                inclusion: true
            },
            {
                name: 'Report Watch Alerts',
                inclusion: true
            },
        ]
    },
    {
        name: 'Business Elite Prosperity',
        type: 'Fair',
        description: "Experience credit excellence on an elite level for your business with our Business Elite Prosperity package. Benefit from top-tier services and personalized strategies that lead to exceptional financial growth for your enterprise.",
        features: [
            {
                name: 'Bureau Disputes/Challenges',
                inclusion: true
            },
            {
                name: 'Creditor Interventions',
                inclusion: true
            },
            {
                name: 'Inquiry Assist',
                inclusion: true
            },
            {
                name: 'ID Theft Insurance',
                inclusion: true
            },
            {
                name: 'Debt Handling',
                inclusion: true
            },
            {
                name: 'TransUnion FICO Score',
                inclusion: true
            },
            {
                name: 'Report Watch Alerts',
                inclusion: true
            },
        ]
    },
]
