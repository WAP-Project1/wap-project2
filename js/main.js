jQuery(function(){

    

    $('#login').click(()=>{
        const username = $("#username").val();
        const password = $("#password").val();
        $.post('http://localhost:3000/postlogin',{
            username: username,
            password: password
        }).done((data)=>{
            window.location.href = './layout/home.html'
        })
        
    })


})