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
const connectionString = process.env.DATABASE_URL || "postgres://reg:coder123@localhost:6321/regNumbers";

const pool = new Pool({connectionString,ssl: useSSL});

const factory = Registration(pool)


app.get('/', async function (req, res) {
  let show = await RegdBase.showplate();
  let towns = await RegdBase.selectedTown();

  res.render('home', {
    towns,
    show
  })
});

app.post("/reg_numbers", async function (req, res, next) {
  try {

    let regText = req.body.regText;

    let regcheck = await RegdBase.check(regText)

    if (regText === "" || regText === undefined) {

      req.flash("info", ' please enter a registration ')
    } else if (regcheck != 0) {

      req.flash("info", 'registration exists , please enter a new one ')
    } else if (regcheck === undefined) {

      req.flash("info", 'not successsfully added ( eg. CA .., CK .., CY .. , CAW )')
    } else if (regcheck) {

      req.flash("info", ' successsfully added ')
    }
    let display = await RegdBase.plateNoAdded(regText);
    let show = await RegdBase.showplate();
    let towns = await RegdBase.selectedTown();

    console.log(display)
    res.render('home', {
      display,
      regText,
      show,
      towns
    })
  } catch (error) {
    next(error)
  }
})

// show selected town reg numbers
app.post("/filter", async function (req, res, next) {
  try {
   
    console.log(req.body);
    let regtype = req.body.TownType;    
    if (regtype == 'All') {
      return res.redirect('/');
    } else {
      let filtered = await RegdBase.filter(regtype);
      console.log(filtered);
      res.render("home", {
        show: filtered,
        towns: await RegdBase.selectedTown()
      });
     }
  } catch (error) {
    next(error.stack);
  }
});

app.post('/reset', async function (req, res, next) {
  try {
    let reset = await RegdBase.deleteregi();

    res.render("home", {
      reset
    })
  } catch (error) {
    next(error)
  }
})

let PORT = process.env.PORT || 1997;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});

