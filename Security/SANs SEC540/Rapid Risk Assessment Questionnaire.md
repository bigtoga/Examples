Complete a Rapid Risk Assessment (RRA) of these systems to gain an understanding of the  attack surface and threats introduced by these modern systems.
- For each item, consider the vulnerabilities and controls that could allow an attacker to compromise the DevOps toolchain

## Version Control

1. Threat actor compromises a user's version control credentials and creates an attacker controlled SSH key for accessing source code.
   - Is MFA enabled for accounts with access? Attackers guessing or brute-forcing CI/CD accounts allows them to inject malicious code into pipelines
   - What SSH keys are available to this user?

1. Threat actor makes an unauthorized commit to main branch, triggering a new release to production that contains a backdoor or trojan.

1. Threat actor modifies a high risk code file (e.g. IaC, cryptography library, authentication module, etc.) without approvals from security team. Releasing changes to high risk code without approvals may violate separation of duties and change approval board requirements.

## Continuous Integration (CI) / Continuous Delivery (CD)

1. Threat actor discovers the CI / CD server (Jenkins) exposed on the Internet, and exploits a vulnerable plugin.

1. Threat actor compromises a CI / CD workflow job and injects malicious code into the build artifacts.

1. User disables a pipeline step enforcing security controls, triggering a release to production that does not meet security or compliance requirements.

1. User approves deployment to production without change approvals.

## Secrets Management

1. User commits a secret (private key, API key) to the source code repository, which is later used by a threat actor to gain unauthorized access to the system.

1. Threat actor compromises a secrets manager credential by creating a malicious job on the CI / CD server. The secrets manager credential is used to gain access to secrets, code signing certificates, deployment keys, etc. intended for other pipeline jobs.
