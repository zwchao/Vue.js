//存取localStorage中的数据

var store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key));
    } 
};

 var list = store.fetch("todolist");
 
 new Vue({
     el:'.main',
     data () {
         return {
             list:list,
             todo:'' ,
             editTodos:'',//记录正在编辑的数据
             beforeTitle:''
         }
     },
     watch: {
         list:{
             handler:function(){
             store.save("todolist",this.list);
         },
         deep: true
         }
     },
     computed: {
         unfinished:function(){
             return this.list.filter(function(item){
                 return !item.isChecked;
             }).length
         }
     },
     methods: {
         addTodo(todo){   //添加任务
             if(this.todo!==''){
                 this.list.push({
                title:this.todo,
                isChecked:false
            });
             }       
            this.todo = '';
         },
         deleteTodo(todo){
             var index = this.list.indexOf(todo);
             this.list.splice(index,1);

         },
         editTodo(todo){
             this.beforeTitle = todo.title; 
             this.editTodos = todo;
         },
         editedTodo(todo){
             this.editTodos = '';
         },
         cancelTodo(todo){
             todo.title = this.beforeTitle;
             this.editTodos = '';
         }
     },
     
     directives: {
         "focus":{
             update(el,binding){
                 if(binding.value){
                     el.focus();
                 }
             }
         }
     }
 });