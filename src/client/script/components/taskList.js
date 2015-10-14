import React from 'react';
import Task from './task';
export default React.createClass({
    // handleClickUl(e){
    //     let $=e.target;
    //     console.log($);
    //     if($.tagName==='INPUT'){
    //         let li=$.closest('li');
    //         let reactid=li.dataset.reactid;
    //         let key=reactid.substr(reactid.indexOf('$')+1);
    //         this.props.onClickCheckbox(key);
    //     }
    //     if($.classList.contains('material-icons')){
    //         if($.innerHTML==='create'){
    //             //update this entry
    //             let li=$.closest('li');
    //             let reactid=li.dataset.reactid;
    //             let key=reactid.substr(reactid.indexOf('$')+1);
    //             this.props.onClickEditBtn(key);
    //         }else if($.innerHTML==='delete'){
    //             //delete this entry
    //             let li=$.closest('li');
    //             let reactid=li.dataset.reactid;
    //             let key=reactid.substr(reactid.indexOf('$')+1);
    //             this.props.onClickDeleteBtn(key);
    //         }
    //     }
    // },
    render(){
        let tasksTotal=this.props.tasks.filter(task=>{
            if(this.props.visibleDay===0)return true;
            let past=new Date(task.date);
            let now=new Date();
            let minday;
            if(this.props.visibleDay===1){
                minday=now.setDate(now.getDate()-1);
            }
            else if(this.props.visibleDay===2){
                minday=now.setDate(now.getDate()-2);
            }else if(this.props.visibleDay===7){
                minday=now.setDate(now.getDate()-7);
            }else if(this.props.visibleDay===30){
                minday=now.setMonth(now.getMonth()-1);
            }else{
                minday=now.setFullYear(now.getFullYear()-1);
            }
            return past>minday;
        });
        if(!this.props.oldTaskVisible){
            tasksTotal=tasksTotal.filter(task => !task.isDone);
        }
        let tasksToShow = tasksTotal.map(task => (
            <li key={task.id}>
                <Task
                onClickDeleteBtn={()=>{this.props.onClickDeleteBtn(task.id)}}
                onClickEditBtn={()=>{this.props.onClickEditBtn(task.id)}}
                onClickCheckbox={()=>{this.props.onClickCheckbox(task.id)}}
                id={task.id}
                title={task.title}
                date={task.date}
                isDone={task.isDone}>
                    {task.desc}
                </Task>
            </li>
        ));
        return(
            <ul className='taskList'>
                    {tasksToShow}
            </ul>
        )
    }
});
