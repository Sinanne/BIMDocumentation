export type DocTopic = {
    slug: string;
    title: string;
    content: string; // Markdown content
};

export type DocSection = {
    title: string;
    items: DocTopic[];
};

export const docsData: DocSection[] = [
    {
        title: "Fundamentals",
        items: [
            {
                slug: "what-is-bim",
                title: "What is BIM?",
                content: `
# What is BIM?

**Building Information Modeling (BIM)** is an intelligent 3D model-based process that gives architecture, engineering, and construction (AEC) professionals the insight and tools to more efficiently plan, design, construct, and manage buildings and infrastructure.

## Key Benefits
- **Improved Collaboration**: All stakeholders work from a single source of truth.
- **Cost Estimation**: Accurate take-offs from the model.
- **Clash Detection**: Identify conflicts before construction begins.

> "BIM is not just software; it's a process."
        `
            },
            {
                slug: "history",
                title: "History of BIM",
                content: `
# History of BIM

The concept of BIM has existed since the 1970s, evolving from 2D CAD to complex parametric modeling.

## Timeline
- **1975**: The "Building Description System" paper defined the early concepts.
- **1980s**: Rise of CAD (Computer-Aided Design) replaced manual drafting.
- **2000s**: Modern BIM software like Revit and ArchiCAD mainstreamed the parametric usage.
- **2010s**: Standardization efforts (BS 1192, ISO 19650) began to globalize workflows.
        `
            }
        ]
    },
    {
        title: "ISO 19650 Standards",
        items: [
            {
                slug: "iso-19650-part-1",
                title: "Part 1: Concepts & Principles",
                content: `
# ISO 19650 Part 1: Concepts and Principles

ISO 19650-1 outlines the recommended concepts and principles for business processes across the built asset industry.

## Key Concepts

### 1. Information Management Functions
It defines clear roles rather than job titles:
- **Appointing Party**: The individual or organization (Client/Owner) requiring the information.
- **Lead Appointed Party**: The team (e.g., Lead Architect/Contractor) responsible for coordinating information interpretation.
- **Appointed Party**: The provider of information (e.g., Subcontractors, Consultants).

### 2. Information Requirements
- **OIR (Organizational Information Requirements)**: High-level strategic goals.
- **AIR (Asset Information Requirements)**: Operational and maintenance needs.
- **PIR (Project Information Requirements)**: Specific to the delivery of a project.
- **EIR (Exchange Information Requirements)**: What needs to be delivered, when, and how.

### 3. The Common Data Environment (CDE)
A central repository where information is collected, managed, and disseminated. It ensures there is a single source of truth for the project.
        `
            },
            {
                slug: "iso-19650-part-2",
                title: "Part 2: Delivery Phase",
                content: `
# ISO 19650 Part 2: Delivery Phase

Part 2 details the information management process specifically during the **delivery phase** (design and construction).

## The Information Delivery Cycle

1. **Assessment and Need**: The Appointing Party defines the OIR, PIR, and AIR.
2. **Invitation to Tender**: The Exchange Information Requirements (EIR) are issued to bidders.
3. **Response**: Bidders submit a pre-appointment BIM Execution Plan (BEP).
4. **Appointment**: The lead appointed party is selected, and a detailed BEP is confirmed.
5. **Mobilization**: Testing information exchanges, software, and CDE access.
6. **Collaborative Production**: Teams generate information in the CDE (WIP state).
7. **Information Model Delivery**: Information transitions to the "Shared" state after checking.
8. **Project Close-out**: Final handover of the Project Information Model (PIM) and Asset Information Model (AIM).
        `
            }
        ]
    },
    {
        title: "BIM Best Practices",
        items: [
            {
                slug: "common-data-environment",
                title: "Common Data Environment (CDE)",
                content: `
# Common Data Environment (CDE)

The CDE is the heart of BIM collaboration. ISO 19650 mandates a specific workflow for information containers (files).

## Four States of Information

1. **Work In Progress (WIP)**
   - Used by: Single Task Team (e.g., Architects only).
   - Status: Unverified, changeable.
   - Purpose: Design development.

2. **Shared**
   - Used by: Other Task Teams (Contractors, Engineers).
   - Status: Verified by the author, "Approved for Sharing".
   - Purpose: Coordination and reference.

3. **Published**
   - Used by: The Project Team and Client.
   - Status: Authorized by the Lead Appointed Party/Client.
   - Purpose: Construction, procurement, or regulatory sign-off.

4. **Archived**
   - Used by: Asset Management / Legal.
   - Status: Frozen history.
   - Purpose: Audit trail and record keeping.

> **Tip**: Never move a file from WIP directly to Published. It must pass through the Shared state for coordination.
        `
            },
            {
                slug: "naming-conventions",
                title: "Naming Conventions",
                content: `
# Naming Conventions

Standardized naming ensures every file is identifiable without opening it. A typical ISO 19650 national annex (like UK) naming convention looks like this:

\`Project-Originator-Volume-Level-Type-Role-Number\`

## Example Breakdown
\`PRJ1-ARC-ZZ-01-M3-A-0001\`

- **PRJ1**: Project Code (Project 1)
- **ARC**: Originator Code (Architecture Firm)
- **ZZ**: Volume/Zone (All zones)
- **01**: Level (First Floor)
- **M3**: Type (3D Model)
- **A**: Role (Architect)
- **0001**: Sequential Number

## Why it matters
- **Searchability**: Metadata integration in CDEs.
- **Clarity**: Ambiguity is removed.
- **Versioning**: Usually handled largely by the CDE (P01, C01), keeping the filename constant.
        `
            },
            {
                slug: "lod",
                title: "Level of Information Need (LOD)",
                content: `
# Level of Information Need (LOD)

Previously known as "Level of Development" or "Level of Detail", ISO 19650 refers to it as the "Level of Information Need". It defines *how much* data is required at a specific stage.

## General Scale (US/AIA Reference)

- **LOD 100 (Conceptual)**: "There is a chair here." A generic block representation.
- **LOD 200 (Schematic)**: "It is an office chair about this size." Approximate geometry.
- **LOD 300 (Design)**: "It is a Herman Miller Aeron chair." Specific geometry and dimensions.
- **LOD 350 (Construction)**: "This is how the chair attaches to the floor." interfaces with other systems.
- **LOD 400 (Fabrication)**: "Here are the screws to build it." Shop-ready details.
- **LOD 500 (As-Built)**: "This is the chair we actually installed." Verified field condition.

> **Note**: Don't over-model. Modeling everything to LOD 400 at the Concept stage wastes time and file size.
        `
            }
        ]
    },
    {
        title: "Implementation",
        items: [
            {
                slug: "bim-execution-plan",
                title: "BIM Execution Plan (BEP)",
                content: `
# BIM Execution Plan (BEP)

The BEP is the rulebook for the project. It ensures everyone plays by the same standards.

## Pre-Appointment BEP
Submitted by potential suppliers during the tender process. It demonstrates *capacity* and *capability*:
- "Do you have the right software?"
- "Have you done this level of BIM before?"
- "How will you meet the security requirements?"

## Post-Appointment BEP
The confirmed plan after the contract is awarded. It details *how* the project will be executed:
- **Software Versions**: "We are all using Revit 2024.2".
- **Exchange Formats**: "Deliverables will be IFC 4.3 and PDF".
- **Coordinate System**: "Using OSGB36 grid".
- **Meeting Schedule**: "Clash detection meetings every Tuesday".

> A project without a BEP is guaranteed to have coordination issues.
        `
            }
        ]
    }
];

export function getTopic(slug: string): DocTopic | undefined {
    for (const section of docsData) {
        for (const item of section.items) {
            if (item.slug === slug) return item;
        }
    }
    return undefined;
}

export function getPrevNext(slug: string): { prev?: DocTopic; next?: DocTopic } {
    const allTopics: DocTopic[] = [];
    docsData.forEach(section => {
        allTopics.push(...section.items);
    });

    const currentIndex = allTopics.findIndex(item => item.slug === slug);

    if (currentIndex === -1) return {};

    return {
        prev: currentIndex > 0 ? allTopics[currentIndex - 1] : undefined,
        next: currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : undefined
    };
}
