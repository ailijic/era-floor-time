exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production'
                           ? 'mongodb://ai:password@ds129028.mlab.com:29028/era-shift-db'
                           : 'mongodb://localhost/era-shift-db-dev')
exports.PORT = process.env.PORT || 8080
