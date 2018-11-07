import React, { Component } from 'react';
import axios from 'axios';

const URL = 'https://api.randomuser.me/';
const USER = {"gender":"female","name":{"title":"miss","first":"lydia","last":"prescott"},"location":{"street":"3510 elgin st","city":"lowell","state":"florida","postcode":62950,"coordinates":{"latitude":"84.9939","longitude":"111.4437"},"timezone":{"offset":"-9:00","description":"Alaska"}},"email":"lydia.prescott@example.com","login":{"uuid":"9b315482-98e3-4273-80aa-6080e812683f","username":"purplekoala151","password":"ninjas","salt":"F3nkBnXa","md5":"b277609bf9ff0c42189ab475b328684b","sha1":"0792bd766c0c21271fe786193a6f8689eae51d84","sha256":"cc0f4dfc3970dbace0bfd8f5805c2626f14f03dafaca6058cbb4c773f3ca631f"},"dob":{"date":"1971-04-26T15:00:13Z","age":47},"registered":{"date":"2003-01-27T08:58:46Z","age":15},"phone":"(511)-451-9992","cell":"(630)-409-0322","id":{"name":"SSN","value":"316-28-7229"},"picture":{"large":"https://randomuser.me/api/portraits/women/88.jpg","medium":"https://randomuser.me/api/portraits/med/women/88.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/88.jpg"},"nat":"US"};

export default class RandomUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: USER
    };
  }

  async fetchUser() {
    const resp = await axios(URL);
    this.setState({
      user: resp.data.results[0]
    });
  }

  componentDidMount() {
    setInterval(this.fetchUser.bind(this), 4000);
  }

  local() {
    const user = this.state.user;
    return (
      <div>{user.name.first} is a local</div>
    );
  }

  international() {
    const user = this.state.user;
    return (
      <div>{user.name.first} is a friend from abroad</div>
    )
  }

  render() {
    const user = this.state.user;
    return (<div className="item">
      <h2>Ternary Operator</h2>
      <div>
        {user.nat === 'US'? this.local() : this.international() }
        <img src={user.picture.medium} />
      </div>
    </div>
    );
  }
}
