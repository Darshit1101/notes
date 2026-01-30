# Notes App - Frontend

A modern, responsive React application for managing notes with a clean and intuitive user interface built using React, Redux, and Shopify Polaris.

## Features

- **User Authentication**: Secure login and registration system
- **Notes Management**: Create, edit, delete, and organize notes
- **Responsive Design**: Mobile-friendly interface using Shopify Polaris
- **State Management**: Redux with Redux Saga for predictable state management
- **User Dashboard**: Overview of notes and user statistics
- **Profile Management**: User profile settings and customization
- **Real-time Notifications**: Toast notifications for user feedback
- **Export Functionality**: Export notes and data
- **Testing Support**: Comprehensive testing components

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **State Management**: Redux Toolkit & Redux Saga
- **UI Library**: Shopify Polaris 13.9.0
- **Routing**: React Router DOM 6.26.2
- **Styling**: CSS3 with Polaris components
- **Build Tool**: Create React App
- **Testing**: Jest, React Testing Library
- **Date/Time**: Moment.js
- **Form Validation**: Simple React Validator
- **Image Processing**: DOM to Image
- **Encryption**: Crypto-JS

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # Search engine directives
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Dashboard/      # Dashboard-specific components
│   │   ├── Layout/         # Layout components (Header, Sidebar)
│   │   ├── Login/          # Authentication components
│   │   ├── ManageNotes/    # Notes management components
│   │   ├── Myprofile/      # Profile components
│   │   ├── Setting/        # Settings components
│   │   ├── SignUp/         # Registration components
│   │   ├── Spinner/        # Loading components
│   │   ├── Testing/        # Testing components
│   │   └── Util/           # Utility components
│   ├── containers/         # Page-level container components
│   │   ├── App/            # Main app container
│   │   ├── Dashboard/      # Dashboard page
│   │   ├── Login/          # Login page
│   │   ├── ManageNotes/    # Notes management page
│   │   ├── Myprofile/      # Profile page
│   │   ├── Setting/        # Settings page
│   │   ├── SignUp/         # Registration page
│   │   └── Testing/        # Testing page
│   ├── ducks/              # Redux modules (actions, reducers)
│   │   ├── auth.js         # Authentication state
│   │   ├── dashboard.js    # Dashboard state
│   │   ├── loading.js      # Loading state
│   │   ├── login.js        # Login state
│   │   ├── myprofile.js    # Profile state
│   │   └── toast.js        # Notification state
│   ├── sagas/              # Redux Saga middleware
│   │   ├── auth.js         # Authentication sagas
│   │   ├── dashboard.js    # Dashboard sagas
│   │   ├── login.js        # Login sagas
│   │   └── myprofile.js    # Profile sagas
│   ├── services/           # API services
│   │   └── api.js          # API configurations
│   ├── utils/              # Utility functions
│   │   └── passwordService.js # Password utilities
│   ├── img/                # Static images
│   ├── App.js              # Main App component
│   ├── App.css             # Global styles
│   ├── Routes.js           # Application routing
│   ├── Store.js            # Redux store configuration
│   └── index.js            # Application entry point
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
└── .env.example            # Environment variables template
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API server running

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd notes/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:

   ```env
   REACT_APP_SECRET_KEY_FOR_CRYPTO=your-crypto-secret-key-here
   REACT_APP_API_BASE_URL=http://localhost:1101/api
   ```

## Usage

### Development

```bash
npm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Testing

```bash
npm test
```

Launches the test runner in interactive watch mode.

### Eject (⚠️ One-way operation)

```bash
npm run eject
```

## Available Scripts

| Script          | Description                   |
| --------------- | ----------------------------- |
| `npm start`     | Starts the development server |
| `npm run build` | Creates a production build    |
| `npm test`      | Runs the test suite           |
| `npm run eject` | Ejects from Create React App  |

## Key Features

### Authentication System

- **Login**: Secure user authentication with JWT tokens
- **Registration**: New user registration with validation
- **Password Security**: Client-side password hashing and encryption

### Dashboard

- **Overview**: Summary of user notes and statistics
- **Quick Actions**: Fast access to common operations
- **Recent Activity**: Display of recent note activities

### Notes Management

- **CRUD Operations**: Create, read, update, and delete notes
- **Search & Filter**: Find notes quickly with search functionality
- **Organization**: Categorize and organize notes efficiently
- **Export**: Export notes in various formats

### User Profile

- **Profile Management**: Update user information and preferences
- **Settings**: Customize application behavior
- **Security**: Change passwords and manage security settings

## State Management

The application uses Redux for state management with the following modules:

- **auth**: Authentication state and user sessions
- **dashboard**: Dashboard data and statistics
- **loading**: Global loading states
- **login**: Login form state and validation
- **myprofile**: User profile data and settings
- **toast**: Notification and alert messages

## API Integration

The frontend communicates with the backend API through the `services/api.js` module, which handles:

- HTTP requests to the backend server
- Authentication token management
- Error handling and response parsing
- Request/response interceptors

## UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Shopify Polaris**: Professional and accessible UI components
- **Loading States**: Smooth loading indicators and spinners
- **Toast Notifications**: User-friendly feedback messages
- **Form Validation**: Real-time form validation with error messages

## Environment Variables

| Variable                          | Description                                      | Required |
| --------------------------------- | ------------------------------------------------ | -------- |
| `REACT_APP_SECRET_KEY_FOR_CRYPTO` | Encryption key for client-side crypto operations | Yes      |
| `REACT_APP_API_BASE_URL`          | Backend API base URL                             | Yes      |

## Browser Support

This application supports all modern browsers:

**Production:**

- \> 0.2% market share
- Not dead browsers
- Not Opera Mini

**Development:**

- Latest Chrome
- Latest Firefox
- Latest Safari

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run the test suite (`npm test`)
6. Commit your changes (`git commit -am 'Add new feature'`)
7. Push to the branch (`git push origin feature/new-feature`)
8. Create a Pull Request

## Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component and function testing
- **Integration Tests**: Feature testing across components
- **Test Utilities**: Custom testing utilities and helpers

Run tests with:

```bash
npm test
```

## Performance Optimization

- **Code Splitting**: Automatic code splitting with React.lazy()
- **Bundle Optimization**: Optimized production builds
- **Image Optimization**: Efficient image loading and processing
- **Redux DevTools**: Development debugging support

## Deployment

### Build for Production

```bash
npm run build
```

The build folder will contain the optimized production files ready for deployment.

### Deployment Options

- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload build files to S3 bucket
- **Traditional Hosting**: Upload build folder contents

## License

This project is licensed under the MIT License.

## Support

For support and questions:

1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Provide steps to reproduce any bugs
4. Include your environment details

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
