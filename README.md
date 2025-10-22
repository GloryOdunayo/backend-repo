# E-Commerce Backend API

A robust Node.js/TypeScript backend API for e-commerce applications with authentication, user management, email services, and queue processing capabilities.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user registration, login, and account activation system
- **Email Services**: Integration with SendGrid and Zepto for transactional emails
- **Queue Processing**: Bull queue system with Redis for background job processing
- **Database**: MongoDB with Mongoose ODM
- **Logging**: Winston-based logging with multiple log levels
- **Security**: Password hashing, account locking, and rate limiting
- **Email Templates**: EJS and HTML email templates for various scenarios

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Redis** (for queue processing)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd new
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Application Configuration
   NODE_ENV=development
   APP_ENV=development
   PORT=5000
   API_ROUTE=api/v1
   LOGS_PATH=logs
   APP_CHANNELS=web,mobile,admin

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/ecommerce_db

   # Redis Configuration
   REDIS_HOST=your_redis_host
   REDIS_PORT=your_redis_port
   REDIS_USER=default
   REDIS_PASSWORD=your_redis_password

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30

   # Email Configuration
   EMAIL_DRIVER=sendgrid
   EMAIL_FROM_EMAIL=noreply@yourdomain.com
   EMAIL_FROM_NAME=Your App Name

   # SendGrid Configuration
   SENDGRID_API_KEY=your_sendgrid_api_key

   # Zepto Configuration (Alternative email service)
   ZEPTO_API_URL=your_zepto_api_url
   ZEPTO_TOKEN=your_zepto_token
   ZEPTO_MAIL_ALIAS=your_zepto_alias
   ZEPTO_FROM_EMAIL=noreply@yourdomain.com

   # Application URLs
   SUPERADMIN_EMAIL=admin@yourdomain.com
   CUSTOMER_APP_URL=https://yourdomain.com
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

This will start the server with hot reloading using `ts-node-dev`.

### Production Mode
```bash
# Build the project
npm run build

# Start the production server
npm start
```

## 📁 Project Structure

```
src/
├── config/                 # Configuration files
│   ├── app.config.ts      # Express app configuration
│   ├── db.config.ts       # Database connection
│   ├── winston.config.ts  # Logging configuration
│   └── seeds/             # Database seeders
├── controllers/           # Route controllers
├── dtos/                  # Data Transfer Objects
├── middleware/            # Custom middleware
├── models/                # Database models
├── mappers/               # Data mappers
├── queues/                # Queue processing
│   ├── bull.queue.ts     # Bull queue configuration
│   ├── worker.queue.ts   # Queue workers
│   └── jobs/             # Job definitions
├── repositories/          # Data access layer
├── routes/                # API routes
│   ├── router/           # Route definitions
│   └── routes.router.ts  # Main router
├── services/              # Business logic
├── utils/                 # Utility functions
├── views/                 # Email templates
│   ├── ejs/              # EJS templates
│   └── html/              # HTML templates
└── server.ts              # Application entry point
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/activate` - Account activation

### Users
- `GET /api/v1/users` - Get users (with proper authentication)
- `GET /api/v1/users/:id` - Get specific user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## 🔐 Authentication Flow

1. **Registration**: Users register with email and password
2. **Email Verification**: System sends verification email (token or OTP)
3. **Account Activation**: Users verify their email to activate account
4. **Login**: Authenticated users can log in with JWT tokens
5. **Role-based Access**: Different user types have different permissions

## 📧 Email Services

The application supports multiple email drivers:

- **SendGrid**: Primary email service
- **Zepto**: Alternative email service

Email templates are available in both EJS and HTML formats for:
- Welcome emails
- Email verification
- Password reset
- OTP verification

## 🔄 Queue System

The application uses Bull queues with Redis for background processing:

- **User Jobs**: User-related background tasks
- **Email Jobs**: Email sending tasks
- **Worker Processes**: Handle queue jobs asynchronously

## 🗄️ Database Models

### User Model
- User authentication and profile information
- Role-based permissions
- Account status and security features
- Login tracking and account locking

### Role Model
- Role definitions and permissions
- Role-based access control

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Tokens**: Secure authentication tokens
- **Account Locking**: Automatic account locking after failed attempts
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive request validation

## 📊 Logging

The application uses Winston for structured logging:

- **System Logs**: Application-level logging
- **User Logs**: User activity tracking
- **Database Logs**: Database operation logs
- **Exception Logs**: Error and exception tracking

## 🧪 Database Seeding

The application includes seeders for:
- **Roles**: Predefined user roles
- **Users**: Sample user data
- **System Data**: Initial system configuration

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in your production environment.

### Database Setup
1. Set up MongoDB instance
2. Configure connection string in `MONGO_URI`
3. Run database migrations/seeders

### Redis Setup
1. Set up Redis instance
2. Configure Redis connection details
3. Ensure Redis is accessible for queue processing

### Email Service Setup
1. Configure either SendGrid or Zepto
2. Set up email templates
3. Test email delivery

## 🛠️ Development

### Adding New Features
1. Create controllers in `src/controllers/`
2. Define routes in `src/routes/router/`
3. Add services in `src/services/`
4. Create DTOs in `src/dtos/`
5. Update models if needed

### Database Changes
1. Update models in `src/models/`
2. Create migrations if needed
3. Update seeders in `src/config/seeds/`

## 📝 API Documentation

The API follows RESTful conventions with consistent response formats:

```json
{
  "error": false,
  "errors": [],
  "data": {},
  "message": "successful",
  "status": 200
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the logs in the `src/logs/` directory
- Review the configuration files
- Ensure all environment variables are properly set
- Verify database and Redis connections

## 🔄 Version History

- **v1.0.0**: Initial release with authentication, user management, and email services

---

**Author**: Gee  
**Version**: 1.0.0  
**Last Updated**: 2024
