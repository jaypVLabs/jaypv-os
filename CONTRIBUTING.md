# Contributing to JayPVentures LLC

Thank you for contributing to the JayPVentures LLC digital infrastructure system!

## Access & Permissions

### Primary Contact
- **Technical Lead:** jayhere@jaypventuresllc.com
- **GitHub Organization:** JayPVentures-LLC

### Repository Access
To contribute to this repository, you need:
1. GitHub account with access to JayPVentures-LLC organization
2. Git configured with your authorized email address
3. Node.js v20+ and npm installed locally
4. (Optional) Python 3.9+ for load testing

## Development Workflow

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/JayPVentures-LLC/jaypventuresllc.com.git
   cd jaypventuresllc.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

4. Run linter to ensure code quality:
   ```bash
   npm run lint
   ```

### Making Changes

1. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Test your changes** locally:
   ```bash
   npm run lint
   npm run dev  # Test with Wix local dev server
   ```

4. **Commit your changes** with clear, descriptive messages:
   ```bash
   git add .
   git commit -m "Brief description of changes"
   ```

5. **Push your branch** and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Request review** from code owners (automatically assigned via CODEOWNERS)

### Pull Request Guidelines

- Keep changes focused and atomic
- Include clear descriptions of what changed and why
- Ensure all CI checks pass before requesting review
- Address review feedback promptly
- Update documentation if your changes affect it

### Code Style

- Follow ESLint configuration (`.eslintrc.json`)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Security Guidelines

⚠️ **NEVER commit sensitive information:**
- No API keys, tokens, or credentials
- No passwords or email credentials
- No database connection strings
- No private keys or certificates

Use environment variables (`.env` file) for sensitive configuration. The `.env` file is gitignored and will never be committed.

### Recent Security Notice
On 2026-04-08, exposed email credentials were removed from the repository. If you had access to those credentials (email password for jayhere@jaypventuresllc.com), they have been rotated. See [SECURITY.md](SECURITY.md) for details.

## Project Structure

```
.
├── src/
│   ├── backend/          # Backend web methods and permissions
│   └── pages/            # Wix page components
├── docs/                 # Project documentation
├── load-testing/         # Python/Locust load tests
├── .github/
│   ├── workflows/        # CI/CD workflows
│   └── CODEOWNERS        # Code review assignments
└── package.json          # Node.js dependencies and scripts
```

## Testing

### Linting
```bash
npm run lint
```

### Load Testing
```bash
pip install -r load-testing/requirements.txt
npm run test:load
```

## Deployment

Changes merged to the `main` branch automatically deploy to the live Wix site via Git Integration. See [docs/deployment.md](docs/deployment.md) for details.

## Questions or Issues?

- Create a GitHub issue for bugs or feature requests
- Contact jayhere@jaypventuresllc.com for access or permissions questions
- Review existing documentation in the `docs/` directory

## Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Maintain confidentiality of sensitive information
- Follow security best practices

---

Thank you for contributing to JayPVentures LLC! 🚀
