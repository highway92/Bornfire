$("#context").keydown(function(key){
    if(key.keyCode==13) {
        key.preventDefault();
        $('#button-addon2').click();
    }
});

$('#button-addon2').click(function(e){
    const context = $('#context').val();
    e.preventDefault();
    var postdata = {
        "context" : context
    };
    alert("사용자의 글을 감정분석중 입니다!")
    $.ajax({
        type: 'POST',
        url: '/feed',
        data: JSON.stringify(postdata),
        dataType : 'json',
        contentType: "application/json",
        
        success: function(datas){
            card(datas);
            $("#context").val('');
        },
        error: function(jqXHR, status, error){
            if(jqXHR.status == 500){
                alert("잘못된 접근입니다.")
            }
            if(jqXHR.status == 404){
                alert('로그인이 필요합니다.')
            }
            if(jqXHR.status == 501){
                alert("메세지를 입력해주세요.")
            }
        }
    })
})

$(document).on("click",".btn-dark",function(){
    let $dom = $(this); 
    let id = $(this).val();


    $.ajax({
        type: 'UPDATE',
        url: '/likes',
        data: JSON.stringify(id),
        dataType : 'json',
        contentType: "application/json",
        success: function(thumbs_up){
            console.log(thumbs_up)
            $dom.html("🙌 <span> &nbsp;" + thumbs_up + "</span>"); 
        },
        error: function(jqXHR, exception){
            if(jqXHR.status==404){
                alert("로그인이 필요합니다.")
            }
        }
    })

});
var page = 1;
var scrollchk = true;
var mutex = false;
// 스크롤 감지
$(function(){
    $(window).scroll(function(){
        let $window = $(this);
        let scrollTop = $window.scrollTop();
        let windowHeight = $window.height();
        let documentHeight = $(document).height();

        if(scrollchk){
            if(scrollTop + windowHeight + 230 > documentHeight){
                if (mutex){
                    return;
                }
                mutex = true;
                console.log("hi");
                $('loading').show();
                fetchList(page);
                page++;
                mutex = false;
                scrollchk = true;
                
            }
        }
    })
})

let fetchList = function(page){
    console.log('page: '+page);

    let page_num ={
        "page" : page
    };

    console.log(page_num);
    $.ajax({
        type: "POST",
        url: '/inifinity',
        data: JSON.stringify(page_num),
        contentType: "application/json",
        dataType : 'json',
        beforeSend: function(){
           
        },
        success: function(result){
            //컨트롤러에서 가져온 리스트는 result.data에 담겨오도록 한다.
            //남은 데이터가 0개 이하일 경우 무한 스크롤 종료
            console.log(result, page)
            var res = 1;
            res = card_bottom(result)
        

            let length = res;
            while(length != 0){
                mutex = true;
                scrollhk = false;
                return;
            }
            mutex = false;
            scrollchk = true;
            page ++;
             //데이터 로딩이 끝나면 스크롤체크를 풀어준다.
             //데이터로딩이 끝나면 ajax접근권한을 준다(중복호출 방어)
        },
        complete: function(){
            $('#loading').hide(300);
        }
    });
}


function card_bottom(datas){
    parent = document.getElementById('card-row');
    for(var i=0; i<datas.length; i++){
        var col = document.createElement("div");
        col.setAttribute("class", "col")
        parent.appendChild(col);

        var card = document.createElement("div");
        card.setAttribute("class", "card h-100 feed-comment");
        col.appendChild(card)

        var card_header = document.createElement("div");
        card_header.setAttribute("class", "card-header");
        card.appendChild(card_header);

        var card_body = document.createElement("div");
        card_body.setAttribute("id", "card-body");
        card_body.setAttribute("class", "card-body card-content");
        card.appendChild(card_body);

        var card_footer = document.createElement("div");
        card_footer.setAttribute("class", "card-footer")
        card.appendChild(card_footer);

        var small = document.createElement("small");
        card_header.appendChild(small);

        var card_header_id = document.createElement("div");
        card_header_id.setAttribute("id", "card-header");
        card_header_id.innerText = datas[i]['nickname'];
        console.log(card_header_id);
        small.appendChild(card_header_id);

        var blockquote = document.createElement("blockquote");
        blockquote.setAttribute("class", "blockquote mb-0");
        card_body.appendChild(blockquote);

        var p =  document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = datas[i]['context'];
        blockquote.appendChild(p);

        
        var feed_button =  document.createElement("div")
        feed_button.setAttribute("class", "feed-button");
        card_footer.appendChild(feed_button);
    
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-dark");
        button.setAttribute("value", datas[i]['_id']);
        button.innerHTML = " 🙌"+ "<span> &nbsp;"+ datas[i]['thumbs-up']+ "</span>";
        feed_button.appendChild(button);       
    }
    return 0;
}

function card(datas){
    parent = document.getElementById('card-row');
    for(var i=0; i<datas.length; i++){
        var col = document.createElement("div");
        col.setAttribute("class", "col")
        parent.insertBefore(col, parent.firstChild);

        var card = document.createElement("div");
        card.setAttribute("class", "card h-100 feed-comment");
        col.appendChild(card)

        var card_header = document.createElement("div");
        card_header.setAttribute("class", "card-header");
        card.appendChild(card_header);

        var card_body = document.createElement("div");
        card_body.setAttribute("id", "card-body");
        card_body.setAttribute("class", "card-body card-content");
        card.appendChild(card_body);

        var card_footer = document.createElement("div");
        card_footer.setAttribute("class", "card-footer")
        card.appendChild(card_footer);

        var small = document.createElement("small");
        card_header.appendChild(small);

        var card_header_id = document.createElement("div");
        card_header_id.setAttribute("id", "card-header");
        card_header_id.innerText = datas[i]['nickname'];
        console.log(card_header_id)
        small.appendChild(card_header_id)

        


        var blockquote = document.createElement("blockquote");
        blockquote.setAttribute("class", "blockquote mb-0");
        card_body.appendChild(blockquote);

        var p =  document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = datas[i]['context'];
        blockquote.appendChild(p);

        
     
        var feed_button =  document.createElement("div")
        feed_button.setAttribute("class", "feed-button");
        card_footer.appendChild(feed_button);
    
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-dark");
        button.setAttribute("value", datas[i]['_id']);
        button.innerHTML = " 🙌"+ "<span> &nbsp;"+ datas[i]['thumbs-up']+ "</span>";
        feed_button.appendChild(button);          
    }
}
