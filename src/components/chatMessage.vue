<template>
    
 
     

        <header >
            <button class="logout " @click="method.Logout">logout</button>
            <h1>{{data}} </h1>
        </header>
 
<section   class="chat-box">
      <div 
        v-for="message in Messages" 
        :key="message.key" 
        :class="(message.username == data ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
         
         
	<div class="content" > {{ message.content }}</div> 
      
  <button   @click="Edit(message)"   v-if="message.username ==data"  style="color:green"  ><i class="fa-solid fa-pen-to-square"></i></button>
 
  <button   @click="Delete(message)"  v-if="message.username ==data"  style="color:red"  ><i class="fa-solid fa-trash"></i></button>
  
  
   


 
        </div>
      </div>
    </section>
    
  
</template>

<script>
 
import db from '../dbs/db'
import {  ref } from 'vue';
export default {

	props:{
  data:String,
 Messages:Array,
 method: { type: Function },
  
	} ,
	setup (){
 const status = ref(false);
	const Delete=(Messages)=>{ 
   if (window.confirm("Do you really want to delete?")) {
  let chatRef = db.database().ref("/messages");


 if(chatRef.child(Messages.id).remove( )){
	var status=false
 
alert('message deleted')
return status==true
 }

   

      
 
   }
           
} 


const   Edit =(message)=>{

 let value=window.prompt( `current text is ${message.content}`)
  if (value!=null) {
	console.log("prompt value is ",value);
 
let chatRef = db.database().ref("/messages");

	chatRef.child(message.id).update({
		content:value
});
alert("updated")
  }
}


    

  return{
Delete,
status,
Edit,
  }
	}
 
}
</script>
<style lang="scss">
 


 

	.chat {
		flex-direction: column;

		header {
			position: relative;
			display: block;
			width: 100%;
			padding: 50px 30px 10px;

			.logout {
				position: absolute;
				top: 15px;
				right: 15px;
				appearance: none;
				border: none;
				outline: none;
				background: none;
				
				color: #FFF;
				font-size: 18px;
				margin-bottom: 10px;
				text-align: right;
			}

			h1 {
				color: #FFF;
			}
		}

		.chat-box {
			border-radius: 24px 24px 0px 0px;

			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
			flex: 1 1 100%;
			padding: 30px;
				background-color: #3234a8;
          

			.message {
				display: flex;
				margin-bottom: 15px;
				
				.message-inner {
					.username {
						color: #888;
						font-size: 16px;
						margin-bottom: 5px;
						padding-left: 15px;
						padding-right: 15px;
					}

					.content {
						display: inline-block;
						padding: 10px 20px;
						background-color: #F3F3F3;
						border-radius: 999px;

						color: #333;
						font-size: 18px;
						line-height: 1.2em;
						text-align: left;
					}
				}

				&.current-user {
					margin-top: 30px;
					justify-content: flex-end;
					text-align: right;

					.message-inner {
						max-width: 75%;

						.content {
							color: #FFF;
							font-weight: 600;
							background-color: #ce2141;
						}
					}
				}
			}
		}

		footer {
			position: sticky;
			bottom: 0px;
			background-color: #FFF;
			padding: 30px;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);

			form {
				display: flex;

				input[type="text"] {
					flex: 1 1 100%;

					appearance: none;
					border: none;
					outline: none;
					background: none;

					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px 0px 0px 8px;
					
					color: #333;
					font-size: 18px;

					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;

					transition: 0.4s;

					&::placeholder {
						color: #888;
						transition: 0.4s;
					}
				}
				
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;

					display: block;
					padding: 10px 15px;
					border-radius: 0px 8px 8px 0px;

					background-color: #ea526f;

					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
			}
		}
	}

</style>