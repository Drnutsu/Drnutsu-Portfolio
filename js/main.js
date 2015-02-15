$(document).ready(function() {
    $('#search').hideseek({
    	highlight: true,
    	nodata: '`ไม่พบข้อมูล'
    	});
    //Set shop first page equal
    equalHeight($(".equal"));
    //Transition Animation
     $(".animsition").animsition({
  
    inClass               :   'fade-in-right',
    outClass              :   'fade-out-right',
    inDuration            :    1500,
    outDuration           :    800,
    linkElement           :   '.animsition-link', 
    loading               :    false,
    loadingParentElement  :   'div.content', //animsition wrapper element
    loadingClass          :   'animsition-loading',
    unSupportCss          : [ 'animation-duration',
                              '-webkit-animation-duration',
                              '-o-animation-duration'
                            ],
    //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser. 
    //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    
    overlay               :   false,
    
    overlayClass          :   'animsition-overlay-slide',
    overlayParentElement  :   'body'
  });
});

function equalHeight(group) {    
    tallest = 0;  
    group.each(function() {       
        thisHeight = $(this).height();
        console.log(thisHeight);       
        if(thisHeight > tallest) {          
            tallest = thisHeight;
            console.log("tall : "+tallest);    
        }    
    });    
    group.each(function() { $(this).height(tallest); });
} 

