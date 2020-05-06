import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './Leaderboard.css';
import {UserDetails} from '../../interfaces/userInterface';

interface UserDetailsProps {
    [key: string]: UserDetails
}

interface leaderDetails {
    id: string,
    name: string,
    avatarURL: string,
    answersPosted: number,
    questionsPosted: number
}

interface Props {
    currentUser: string;
    users: UserDetailsProps;
};

interface State {
    leaderboard: leaderDetails[];
};

class Leaderboard extends PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            leaderboard: []
        }
    }

    componentDidMount() {
        const { users } = this.props;
        const usernames = Object.keys(users);

        let leaderboard = usernames.map(name => {
            const userDetails = users[name];
            return {    
                id: userDetails.id,
                name: userDetails.name,
                avatarURL: userDetails.avatarURL,
                answersPosted: Object.keys(userDetails.answers).length,
                questionsPosted: userDetails.questions.length,
            }
        });

        leaderboard.sort(function(l1, l2){return (
            (l2.answersPosted + l2.questionsPosted) - 
            (l1.answersPosted + l1.questionsPosted)
        )});

        this.setState({leaderboard});
    }

    render() {
        const { leaderboard } = this.state;

        return (
            <div>
                {(leaderboard || []).map((leader: any) => (
                    <Card key={leader.name} className='leaderCard'>
                        <CardContent>
                            <div className='leaderContent'>
                                <img src={leader.avatarURL} alt={leader.name} />
                                <div className='leaderDetails'>
                                    <Typography variant="h6">
                                        {leader.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {`Questions Asked:    ${leader.questionsPosted}`}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {`Questions Answered: ${leader.answersPosted}`}
                                    </Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        users: state.user.users,
    }),
    {
    },
)(Leaderboard);
