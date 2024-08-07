const {Schema , model} = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    confirmPassword: {
      type: String,
      minlength: 6,
    },
  }, {
    timestamps: true, 
  });
  
  userSchema.pre('save', async function(){
    try{
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password,salt);
    }catch(e){
      const error = new Error('Problem in hashing the password');
      error.status = 400;
      error.extraDetails = '';
      return next(error);
    }
  })

  userSchema.methods.createToken = function (){
    const secretKey = process.env.MY_SECRET_KEY ;
    const token = jwt.sign(
      { id: this._id, email: this.email ,Name:this.Name },
      secretKey,
      { expiresIn: '30d' }
    );
    return token;
  }

  userSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password, this.password);
  }

  const User = model('UserData', userSchema);

  module.exports=User;