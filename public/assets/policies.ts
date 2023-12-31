
interface Part {
    name: string
    description: string
}

interface Item {
    name: string
    parts: Part[]
}

export const refundPolicy: Item[] = [
    {
        name: "Eligibility for Refund",
        parts: [
            {
                name: "Defective or Damaged Products",
                description: "Customers are eligible for a refund if the received product is defective, damaged, or doesn’t match the description provided on our website.",
            },
        ]
    },
    {
        name: "Refund Process",
        parts: [
            {
                name: "Time Frame",
                description: "Customers must notify us of any issues with their order within 30 days of receiving the product.",
            },
            {
                name: "Contact Information",
                description: "Customers should contact our customer support team at [Contact Email/Phone] to initiate the refund process.",
            },
            {
                name: "Evidence",
                description: "In some cases, photographic evidence or a detailed description of the issue may be required.",
            },
        ]
    },
    {
        name: "Conditions for Refund",
        parts: [
            {
                name: "Return of Goods",
                description: "Depending on Modalyst’s policies, customers may need to return the item. If required, instructions for the return process will be provided by our customer support team.",
            },
            {
                name: "Refund Approval",
                description: "Refunds will be processed upon approval after inspection of the returned item. If the product is eligible for a refund, the amount will be credited back to the original method of payment.",
            },
        ]
    },
    {
        name: "Non-Refundable Items",
        parts: [
            {
                name: "Customized or Personalized Products",
                description: "Items that are customized or personalized cannot be refunded unless they arrive damaged or defective.",
            },
        ]
    },
    {
        name: "Supplier's Terms",
        parts: [
            {
                name: "Modalyst Policies",
                description: "Our refund policy is subject to Modalyst's policies and guidelines. We aim to align our policies with our suppliers to ensure a smooth refund process.",
            },
        ]
    },
    {
        name: "Contact Us",
        parts: [
            {
                name: "Contacting Us",
                description: "For any inquiries or assistance regarding refunds, please contact our customer support team at support@pearlbox.co.",
            },
        ]
    },
]

export const returnPolicy: Item[] = [
    {
        name: "Initiating a Return",
        parts: [
            {
                name: "Contact Procedure",
                description: "Customers who wish to return an item must contact our customer support team at support@pearlbox.co within 30 days of receiving the product to initiate the return process.",
            },
            {
                name: "Reason for Return",
                description: "Customers should provide a reason for the return, such as receiving a damaged item or an incorrect product.",
            },
        ]
    },
    {
        name: "Return Instructions",
        parts: [
            {
                name: "Shipping Details",
                description: "Depending on the nature of the return, customers will receive instructions regarding shipping the item back to the designated address.",
            },
            {
                name: "Return Authorization",
                description: "Customers may need authorization from our team before returning the product. This ensures a smooth processing of returns.",
            },
        ]
    },
    {
        name: "Conditions for Return",
        parts: [
            {
                name: "Item Condition",
                description: "Returned items must be unused, unworn, and in their original packaging (if applicable). This facilitates a prompt assessment for a potential refund or replacement.",
            },
            {
                name: "Exceptions",
                description: "Certain products, like personalized or customized items, may not be eligible for return unless they arrive damaged or defective.",
            },
        ]
    },
    {
        name: "Return Shipping",
        parts: [
            {
                name: "Cost Responsibility",
                description: "Customers may be responsible for covering the cost of return shipping unless the return is due to an error on our part (e.g., sending the wrong item or a defective product).",
            },
        ]
    },
    {
        name: "Processing of Returns",
        parts: [
            {
                name: "Inspection",
                description: "Upon receiving the returned item, our team will inspect it to ensure it meets the conditions outlined in our policy.",
            },
            {
                name: "Refund/Replacement",
                description: "If the returned item meets the criteria for a return, customers will be offered a refund or a replacement, as per their preference and product availability.",
            },
        ]
    },
    {
        name: "Supplier's Terms",
        parts: [
            {
                name: "Modalyst Policies",
                description: "Our return policy is aligned with Modalyst’s guidelines. Customers are encouraged to review Modalyst’s policies in conjunction with ours.",
            },
        ]
    },
    {
        name: "Contact Us",
        parts: [
            {
                name: "Contacting Us",
                description: "For any inquiries or assistance regarding returns, please contact our customer support team at support@pearlbox.co.",
            },
        ]
    },
]