# Wayzon Educational Consultancy - Frontend

A premium Angular application for Wayzon Educational Consultancy, featuring modern UI design, responsive layouts, and comprehensive educational services.

## 🚀 Features

- **Premium UI Design**: Modern, responsive design with Tailwind CSS
- **Educational Services**: Comprehensive college and course information
- **AI Chat Bot**: Interactive assistance for students
- **Advanced Filtering**: Smart filters for colleges and courses
- **Mobile Responsive**: Optimized for all devices
- **Performance Optimized**: Fast loading and smooth animations

## 🛠️ Technology Stack

- **Framework**: Angular 20.1.0
- **Styling**: Tailwind CSS 3.4.17
- **Build Tool**: Angular CLI with Vite
- **Deployment**: Vercel
- **Language**: TypeScript 5.8.2

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v20.1.0)

## 🚀 Quick Start

### Development Server

To start a local development server:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:4200/` with auto-reload enabled.

### Building for Production

To build the project for production:

```bash
npm run build:prod
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 🚀 Deployment

### Vercel Deployment

This project is optimized for Vercel deployment:

```bash
npm run deploy
```

Or use the Vercel CLI:

```bash
vercel --prod
```

### Manual Deployment

1. Build the project:
```bash
npm run build:prod
```

2. Deploy the `dist/E-consultancyFrontend/browser` directory to your hosting provider.

## 📁 Project Structure

```
src/
├── app/
│   ├── features/          # Feature modules
│   │   ├── home/         # Home page
│   │   ├── colleges/     # Colleges listing & details
│   │   ├── courses/      # Courses information
│   │   ├── about/        # About page
│   │   └── contact/      # Contact page
│   ├── layout/           # Layout components
│   │   ├── header/       # Navigation header
│   │   └── footer/       # Footer component
│   ├── shared/           # Shared components & services
│   └── core/             # Core services & guards
├── assets/               # Static assets
└── environments/         # Environment configurations
```

## 🎨 Design System

- **Colors**: Blue/Purple gradient theme
- **Typography**: Modern, clean fonts
- **Components**: Reusable, accessible components
- **Animations**: Smooth transitions and micro-interactions
- **Icons**: Material Icons integration

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build:prod` - Production build
- `npm run deploy` - Build and deploy
- `npm run clean` - Clean cache and dependencies
- `npm run reinstall` - Clean reinstall

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, contact Wayzon Educational Consultancy:
- Email: info@wayzon.edu
- Phone: +91 974056 8888
- Website: https://wayzon.edu
