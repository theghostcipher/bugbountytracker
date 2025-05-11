import { Template } from "@/types";
import { generateId } from "@/lib/utils";

// Helper to generate task IDs
const genTaskId = (): string => generateId();

export const webApplicationTemplate: Template = {
  id: "web-app",
  name: "Web Application",
  description: "Comprehensive methodology for web application bug bounty hunting",
  categories: [
    {
      id: generateId(),
      name: "Reconnaissance",
      icon: "folder",
      expanded: true,
      tasks: [
        {
          id: genTaskId(),
          title: "Domain enumeration with Amass, Subfinder, etc.",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Port scanning with Nmap or Masscan",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Directory bruteforcing with gobuster, dirsearch, etc.",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Screenshot capturing with Aquatone, EyeWitness, etc.",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "GitHub recon with GitDorker, gitleaks, etc.",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "JS analysis with LinkFinder, JSParser, etc.",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for exposed API documentation",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Look for subdomains takeover opportunities",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Authentication Testing",
      icon: "shield-keyhole",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Test for default/weak credentials",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for authentication bypasses",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for MFA implementation issues",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for password reset vulnerabilities",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for session management issues",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Injection Testing",
      icon: "spy",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Test for SQL injection vulnerabilities",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for XSS vulnerabilities",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for CSRF vulnerabilities",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for command injection vulnerabilities",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for SSRF vulnerabilities",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for XXE vulnerabilities",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Authorization Testing",
      icon: "user-check",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Test for vertical privilege escalation",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for horizontal privilege escalation",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for insecure direct object references (IDOR)",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test access controls in APIs",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Business Logic",
      icon: "briefcase",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Test for race conditions",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for flawed application logic",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for financial/payment manipulation",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    }
  ]
};

export const apiTemplate: Template = {
  id: "api",
  name: "API Assessment",
  description: "Methodology for testing API security",
  categories: [
    {
      id: generateId(),
      name: "API Discovery",
      icon: "search",
      expanded: true,
      tasks: [
        {
          id: genTaskId(),
          title: "Identify API endpoints from documentation",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for hidden endpoints in JS files",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Enumerate API versions",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Authentication",
      icon: "key",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Check for API key exposure",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test JWT implementation",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test OAuth implementation",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Authorization",
      icon: "shield",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Test RBAC implementation",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for broken object level authorization",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Input Validation",
      icon: "filter",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Test parameter tampering",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test content-type validation",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for API injection vulnerabilities",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    }
  ]
};

export const mobileTemplate: Template = {
  id: "mobile",
  name: "Mobile Application",
  description: "Methodology for testing mobile application security",
  categories: [
    {
      id: generateId(),
      name: "Static Analysis",
      icon: "file-code",
      expanded: true,
      tasks: [
        {
          id: genTaskId(),
          title: "Decompile/unpack the application",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for hardcoded credentials",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for insecure data storage",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Dynamic Analysis",
      icon: "activity",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Set up proxy for traffic interception",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test certificate pinning bypass",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for leaked data in traffic",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Local Storage",
      icon: "database",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Check SQLite databases",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check shared preferences/plist files",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check log files for sensitive info",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    }
  ]
};

export const networkTemplate: Template = {
  id: "network",
  name: "Network Infrastructure",
  description: "Methodology for testing network infrastructure security",
  categories: [
    {
      id: generateId(),
      name: "Enumeration",
      icon: "list",
      expanded: true,
      tasks: [
        {
          id: genTaskId(),
          title: "Perform comprehensive port scanning",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Identify running services and versions",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Map network topology",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    },
    {
      id: generateId(),
      name: "Vulnerability Assessment",
      icon: "alert-triangle",
      expanded: false,
      tasks: [
        {
          id: genTaskId(),
          title: "Check for known CVEs in identified services",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Test for default credentials",
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: genTaskId(),
          title: "Check for misconfigured services",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    }
  ]
};

export const customTemplate: Template = {
  id: "custom",
  name: "Custom Template",
  description: "A blank template for your custom methodology",
  categories: [
    {
      id: generateId(),
      name: "My Category",
      icon: "list",
      expanded: true,
      tasks: [
        {
          id: genTaskId(),
          title: "Add your tasks here",
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    }
  ]
};

export const templates = [
  webApplicationTemplate,
  apiTemplate,
  mobileTemplate,
  networkTemplate,
  customTemplate
];

export const getTemplateById = (id: string): Template => {
  const template = templates.find(t => t.id === id);
  if (!template) {
    return customTemplate;
  }
  return template;
};
