import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './Leaderboard.css';

interface leaderDetails {
    name: string;
    profile: string;
    questionsAnswered: number;
    questionsPosted: number;
    answeredQuestionIds: string[];
    postedQuestionIds: string[];
}

interface Props {
    currentUser: string;
    users: any;
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
            return {name, ...users[name]}
        });

        leaderboard.sort(function(l1, l2){return (
            (l2.questionsAnswered + l2.questionsPosted) - 
            (l1.questionsAnswered + l1.questionsPosted)
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
                                <img src={leader.profile} alt={leader.name} />
                                <div className='leaderDetails'>
                                    <Typography variant="h6">
                                        {leader.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {`Questions Asked:    ${leader.questionsPosted}`}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {`Questions Answered: ${leader.questionsAnswered}`}
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
