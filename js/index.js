let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const RegistratioonPS = require('./logic');
const flash = require('express-flash');
const session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;


// initialise the flash middleware
app.use(flash());
app.use(express.static('public'));

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// initialise session middleware - flash-express depends on it
app.use(session({ secret: "this line for an error message",
  resave: false,
  saveUninitialized: true
}));
// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) { useSSL = true;}
// which db connection to coderreg
const connectionString = process.env.DATABASE_URL || "postgres://coderreg:coder123@localhost:6321/";

const pool = new Pool({connectionString,ssl: useSSL});


app.post('/', async function (req, res, next) {

  try {
    
  res.render("home", { reset })
  } catch (error) {
    next(error)
  }
})


let PORT = process.env.PORT || 1321;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
