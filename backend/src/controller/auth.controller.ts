import { email } from './../../node_modules/zod/src/v4/core/regexes';
import { Message } from "../models/Message.models";
import { Conversation } from "../models/Conversation.models";
import { Response,Request } from "express";
import bcrypt from 'bcrypt'
import {User} from '../models/User.models'


export default class  auth  {
    register  = async (req:Request,res:Response)=>{
        try{
            const {email , fullname ,passwordHash } =  req.body ;
                if(!email || !fullname || !passwordHash ){
                res.status(404).json({message:'Not  Found'})
                
        }
            const result =  await User.findOne({where:{
                email
            }})
            if(result){
               return res.status(400).json({message:"field all required"})     
            }
            const password = await bcrypt.hash(passwordHash,10)
            // check password 
            if(!password){
                return console.log(password , "error")
            } 

              await User.create({
                name:fullname,
                email:email,
                password:passwordHash
            })
            
            
            
    
        }
        catch(err){
            console.error(err)
        }
    }
     login  = async (req:Request,res:Response)=>{
        try{
        const {email , fullname} =  req.body ;
            if(!email || !fullname){
            res.status(404).json({message:'Not  Found'})

        }
        const result =  User.findOne({where:{email}})
        }
        catch(err){
            return console.log(err)
        }
    }

    me  = async (req:Request,res:Response)=>{
        try{
        const {email , fullname} =  req.body ;
        if(email&&fullname ===  null){
            res.status(404).json({message:'Not  Found'})
        }
        }
        catch{

        }
    }
}
