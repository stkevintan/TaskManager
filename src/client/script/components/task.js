import React from 'react';
import {Card,CardHeader,CardText,CardActions} from 'material-ui/lib/card';
import FontIcon from 'material-ui/lib/font-icon';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
export default React.createClass({
    getDefaultProps:()=>({isDone:false}),
    render(){
        const done=<Avatar
            color='#fff'
            backgroundColor={Colors.pinkA200}
            icon={<FontIcon className='material-icons'>done</FontIcon>}/>
        const undone=<Avatar
            color='#fff'
            backgroundColor={Colors.pinkA200}
            icon={<FontIcon className='material-icons'>query_builder</FontIcon>}/>
        const CheckIcon = <Checkbox
            name="indicator"
            onClick={this.props.onClickCheckbox}
            style={{float:'left',
                width:'auto',
                'margin-left':'-15px',
                'margin-top':'-15px'}}
            iconStyle={{
                width:'40px',
                height:'40px',
                'margin-left':'8px',
                'margin-top':'8px'}}
            defaultChecked={this.props.isDone}
            checkedIcon={done}
            unCheckedIcon={undone}/>

        return <Card ref='task' initiallyExpanded={false}>
            <CardHeader
                title={this.props.title}
                subtitle={this.props.date}
                avatar={CheckIcon}
                style={{'line-height':'1.6em'}}
                showExpandableButton={true}>
            </CardHeader>
            <CardText style={{'padding-left':'80px'}}expandable={true}>
            {this.props.children||<i style={{color:Colors.grey500}}>Nothing Here...</i>}
            </CardText>
            <CardActions expandable={true} style={{float:'right'}}>
                <IconButton tooltip="编辑" tooltipPosition='top-center' iconClassName='material-icons'
                onClick={this.props.onClickEditBtn}
                iconStyle={{color:Colors.grey500}}>
                    create
                </IconButton>
                <IconButton tooltip="删除" tooltipPosition='top-center' iconClassName='material-icons'
                onClick={this.props.onClickDeleteBtn}
                iconStyle={{color:Colors.grey500}}>
                    delete
                </IconButton>
            </CardActions>
        </Card>
    }
});
