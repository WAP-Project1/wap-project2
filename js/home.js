jQuery(function(){

    $.get("http://localhost:3000/todo")
    .done((data) => {
        showDash(data)
        let completed = data.filter((x) => x.status == "done");
        let pending = data.filter((x) => x.status == "pending");
        let archived = data.filter((x) => x.status == "deleted");
        
        showPending(pending)
        showCompletd(completed)
        showArchived(archived)
    });

    function showDash(data){
        let completed = data.filter((x) => x.status == "done");
        let pending = data.filter((x) => x.status == "pending");
        let archived = data.filter((x) => x.status == "deleted");
        $("#noarch").text(archived.length);
        $("#nopend").text(pending.length);
        $("#nocomp").text(completed.length);
    }

    function showPending(data){
        console.log(data);
        for(let i=0; i< data.length; i++){
            $(".pend").append(
              `<div class="task">
                <div class="_left">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="status">
                    </div>
                    <div class="data">
                        <p class="lead">
                            ${data[i].title}
                        </p>
                        <figcaption class="blockquote-footer">
                            ${data[i].description}
                        </figcaption>
                    </div>
                </div>
                <div class="cont">
                    <div class="tags">
                        <p id="cat"class="lead">
                            ${data[i].category}
                        </p>
                        <p id="date" class="lead">
                            ${data[i].due_date}
                        </p>
                    </div>
                    <div class="edit">
                        <i class="bi bi-pencil"></i>
                    </div>
                </div>
            </div>`
            );
        }
    }
    function showCompletd(data) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        $(".comp").append(
          `<div class="task">
                <div class="_left">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="status">
                    </div>
                    <div class="data">
                        <p class="lead">
                            ${data[i].title}
                        </p>
                        <figcaption class="blockquote-footer">
                            ${data[i].description}
                        </figcaption>
                    </div>
                </div>
                <div class="cont">
                    <div class="tags">
                        <p id="cat"class="lead">
                            ${data[i].category}
                        </p>
                        <p id="date" class="lead">
                            ${data[i].due_date}
                        </p>
                    </div>
                    <div class="edit">
                        <i class="bi bi-pencil"></i>
                    </div>
                </div>
            </div>`
        );
      }
    }
    function showArchived(data) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        $(".arch").append(
          `<div class="task">
                <div class="_left">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="status">
                    </div>
                    <div class="data">
                        <p class="lead">
                            ${data[i].title}
                        </p>
                        <figcaption class="blockquote-footer">
                            ${data[i].description}
                        </figcaption>
                    </div>
                </div>
                <div class="cont">
                    <div class="tags">
                        <p id="cat"class="lead">
                            ${data[i].category}
                        </p>
                        <p id="date" class="lead">
                            ${data[i].due_date}
                        </p>
                    </div>
                    <div class="edit">
                        <i class="bi bi-pencil"></i>
                    </div>
                </div>
            </div>`
        );
      }
    }

    $('#save').click(function(){
        const title = $('#title').val()
        const desc = $("#description").val();
        const cat = $("#category").val();
        const due = $("#start").val();

        $.post("http://localhost:3000/todo", {
            title:title,
            description:desc,
            category:cat,
            due_date:due
        }).done((data) => {
            console.log(data);
            $("#myModal").modal("hide");
            // window.location.href = "home.html";
        });
    })


    const myModal = document.getElementById('mymodal')
    $('.add').click(function(){
        $('#myModal').modal('show')

    })

    $('#pending').click(function (){
        $(this).addClass('selected')
        $('.dash').css('display','none')
        $('.comp').css('display','none')
        $('.arch').css('display','none')
        $('.pend').css('display','flex')
        $('.account').css('display','none')
        setSelected('pend')
    })
    

    $('#dashboard').click(function (){
        setSelected('dash')
        $(this).addClass('selected')
        $('.dash').css('display','flex')
        $('.dash').css('flex-direction','column')
        $('.pend').css('display','none')
        $('.comp').css('display','none')
        $('.arch').css('display','none')
        $('.account').css('display','none')
        
    })

    $('#completed').click(function (){
        $(this).addClass('selected')
        $('.dash').css('display','none')
        $('.pend').css('display','none')
        $('.comp').css('display','flex')
        $('.arch').css('display','none')
        $('.account').css('display','none')
        setSelected('comp')
    })
    

    $('#archived').click(function (){
        $(this).addClass('selected')
        $('.dash').css('display','none')
        $('.pend').css('display','none')
        $('.comp').css('display','none')
        $('.arch').css('display','flex')
        $('.account').css('display','none')
        setSelected('arch')
    })

    $('#account').click(function (){
        $(this).addClass('selected')
        $('.dash').css('display','none')
        $('.pend').css('display','none')
        $('.comp').css('display','none')
        $('.arch').css('display','none')
        $('.account').css('display','flex')
        setSelected('account')
    })

    function setSelected(item){
        switch (item) {
            case 'dash':
                $('#pending, #completed, #archived, #account').removeClass('selected')
                break;
            case 'pend':
                $('#dashboard, #completed, #archived, #account').removeClass('selected')
                break;
            case 'comp':
                $('#pending, #dashboard, #archived, #account').removeClass('selected')
                break;
            case 'arch':
                $('#pending, #completed, #dashboard, #account').removeClass('selected')
                break;
            case 'account':
                $('#pending, #completed, #archived, #dashboard').removeClass('selected')
                break;
            default:
                break;
        }
    }
})