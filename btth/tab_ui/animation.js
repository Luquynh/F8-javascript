//save line using $ for querySelector 
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
//object1.getabc(object2) ->object2 borrow object1 getabc
const tabs=$$('.tab-item')
const panes=$$('.tab-pane')
const line=$('.tabs .line')
console.log(tabs,panes);
tabs.forEach((tab,index) => {
    tab.onclick=function(){
        const pane=panes[index]
        const tabActive=$('.tab-item.active')
        console.log([tabActive]);
        // check if there is any active class 
        $('.tab-item.active').classList.remove('active')
        $('.tab-pane.active').classList.remove('active');
        //Create line below the course
        line.style.left=this.offsetLeft+'px';
        line.style.width=this.offsetWidth +'px';
        //make the element become active when clicking 
        pane.classList.add('active')
        this.classList.add('active')
    }
});