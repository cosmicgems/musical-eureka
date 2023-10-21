interface Step {
    id: string,
    step_number: number,
    name: string,
    description: string,
    image: string,
}

export  const process: Step[] = [
    {
        id: 'step-1',
        step_number: 1,
        name: 'Review',
        description: 'First, we will examine your credit collectively to identify which questionable negative items are unfairly impacting your credit.',
        image: '/credit_zen_services_video/review.gif',
    },
    {
        id: 'step-2',
        step_number: 2,
        name: 'Repair',
        description: 'Next, we reach out to the credit bureaus and your creditors to validate these negative items. If they can not confirm their accuracy, they should be willing to remove them – it is all about fairness and integrity at Credit Zen.',
        image: '/credit_zen_services_video/repair.gif',
    },
    {
        id: 'step-3',
        step_number: 3,
        name: 'Improve',
        description: 'While you are actively making smart credit choices, we remain committed to utilizing legal avenues to enhance your credit. This includes promptly handling any fresh credit-related concerns that may arise along the way.',
        image: '/credit_zen_services_video/improve.gif',
    },
]

