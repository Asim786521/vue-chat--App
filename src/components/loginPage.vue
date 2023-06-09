<template>
    

   <div class="view login"  v-if="state.username === '' || state.username === null" >
  <form   class="login-form"  @submit.prevent="Login">

    <div class="form-inner">
  
        <h1>Login to FireChat</h1>
        <label for="username"  ></label>
        <input 
          type="text" 
          v-model="inputUsername" 
          placeholder="Please enter your username..." />
        <input 
          type="submit" 
          value="Login" />
 
       
       </div>      
	
  </form>
   </div> 
 
</template>

<script>
 
 
 
 import { reactive, onMounted, ref } from 'vue';
 import db from './'

export default {
  setup () {
    const inputUsername = ref("");
    const inputMessage = ref("");

    const state = reactive({
      username: "",
      messages: []
    });

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    }

    const Logout = () => {
      state.username = "";
    }

    const SendMessage = () => {
      const messagesRef = db.database().ref("messages");

      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }

      const message = {
        username: state.username,
        content: inputMessage.value
      }

      messagesRef.push(message);
      inputMessage.value = "";
    }

    onMounted(() => {
      const messagesRef = db.database().ref("messages");

      messagesRef.on('value', snapshot => {
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          });
        });

        state.messages = messages;
      });
    });

    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      SendMessage,
      Logout
    }
  }
}

</script>
 
<style lang="scss">
* {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.view {
	display: flex;
	justify-content: center;
	min-height: 100vh;
	background-color: #ea526f;
	
	&.login {
		align-items: center;
		.login-form {
			display: block;
			width: 100%;
			padding: 15px;
			
			.form-inner {
				display: block;
				background-color: #FFF;
				padding: 50px 15px;
				border-radius: 16px;
				box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

				h1 {
					color: #AAA;
					font-size: 28px;
					margin-bottom: 30px;
				}

				label {
					display: block;
					margin-bottom: 5px;
					color: #AAA;
					font-size: 16px;
					transition: 0.4s;
				}

				input[type="text"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;

					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px;
					margin-bottom: 15px;
					
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
					width: 100%;
					padding: 10px 15px;
					background-color: #ea526f;
					border-radius: 8px;

					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}

				&:focus-within {
					label {
						color: #ea526f;
					}

					input[type="text"] {
						background-color: #FFF;
						box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

						&::placeholder {
							color: #666;
						}
					}
				}
			}
        }
    }
}
</style>