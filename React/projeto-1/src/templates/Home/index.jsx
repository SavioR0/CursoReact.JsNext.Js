//import logo from './logo.svg';
import { Component } from 'react';
import './styles.css';
import { PostCard } from '../../components/PostCard';
import { loadPost } from '../../utils/load-post';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


//aula 18
class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page : 0,
    postsPerPage :10,
    searchValue : '',
  };

  //componentWillUpdate(){}
  //componentDidUpdate(){}
  async componentDidMount() {
    const {page, postsPerPage} = this.state;
    const postAndPhotos = await loadPost();
    this.setState({ 
      posts: postAndPhotos.slice(page, postsPerPage), 
      allPosts: postAndPhotos,
    })
  }

  loadMorePost = () => {
    const{
      page,
      postsPerPage,
      allPosts,
      posts
    }=this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage+postsPerPage);



    posts.push(...nextPosts); //spread operator
    this.setState({posts, page: nextPage});
  }
  //função responsável por procurar os nomes dos posts de acordo com o input
  handleChange = (e) => {
    const {value} = e.target; //de acordo com que o usuário digita retorna o target
    this.setState({searchValue : value});
  }

  //Map é uma função callback que é passada por argumento para cada elemento no Array, no caso Array de objetos
  render() {
    const { posts, postsPerPage, page,allPosts, searchValue } = this.state;
    const noMorePosts = page+ postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;
    return (
      <section className="container">
        
        <div className = "search-container">
          {/*!! transforma uma variável em booleano em java script*/}
          {!!searchValue && (
              <h1> Search value: {searchValue}</h1>
          )}{/* Se esse valor for diferente de null ele é true e exibe na tela*/}
          <TextInput searchValue = {searchValue} handleChange = {this.handleChange}/>
        </div>

        <div className="posts">
        
          {filteredPosts.map(post => (
            <PostCard key={post.id} id={post.id} title={post.title} body={post.body} cover={post.cover} />
          ))}
        </div>
        <div className = "button-container">
            {!searchValue && (
              <Button disabled = {noMorePosts} onClick = {this.loadMorePost} text = {"Load more posts"}/>
            )}
        </div>
      </section>
    );
  }
}
//Aula 16
/* class App extends Component {
  state = {
    posts: []
  };

  //componentWillUpdate(){}
  //componentDidUpdate(){}
  componentDidMount() {
    this.setState({ //O state será atualizado (Exemplo, a aplicação utiliza alguma API e está esperando dados carregarem)
      posts: [
        {
          id: 1,
          title: 'O titulo 1',
          body: 'O corpo 1',
        },
        {
          id: 2,
          title: 'O titulo 2',
          body: 'O corpo 2',
        },
        {
          id: 3,
          title: 'O titulo 3',
          body: 'O corpo 3',
        },
      ]
    })
  }

  //Map é uma função callback que é passada por argumento para cada elemento no Array, no caso Array de objetos
  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        {posts.map(post => (
          <div>
            <h1 key={post.id}>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
} */



//Aula 15
/* class App extends Component {
  state = {
    posts: [
      {
        id: 1,
        title: 'O titulo 1',
        body: 'O corpo 1',
      },
      {
        id: 2,
        title: 'O titulo 2',
        body: 'O corpo 2',
      },
      {
        id: 3,
        title: 'O titulo 3',
        body: 'O corpo 3',
      },
    ]
  };

  componentDidMount () {
    console.log("oi") // Assim que o carregamento da página ser realizado, aparecerá no cosole OI
  }
  //Map é uma função callback que é passada por argumento para cada elemento no Array, no caso Array de objetos
  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        {posts.map(post => (
          <div>
            <h1 key={post.id}>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
} */



//Aula 14
/* class App extends Component{
  //constructor(props){
    //super(props); //Chamar o construtor da classe Component
    //this.handlePClick = this.handlePClick.bind(this); //Fazer o bind de forma manual

    // this. 
    state = {
      name: 'Sávio Rodrigues',
      counter: 0
    };

  handlePClick =() =>{ //Para não ser necessário a utilização de this em meus métodos e atributos, é só usar arrow function
    //Função para mostrar no console a varoável e o ato de clicar
    // const {name}= this.state; //Preciso fazer o bind dentro da classe pra ter acesso à varável 
    //console.log(`<p> clicado ${name}`); 

    //Mudar o valor do state
    this.setState({name: 'Júnior'}); //Se o estado é mudado, render é chamado novamente com o estado novo.
  }

  handleAClick = (event) => { //Arrow function não possui this dentro dela e busca na sua classe pai
    event.preventDefault();//Impede que faça o que estava programado pra fazer antes (No caso, abrir a pagina do navegador)
    const {counter} = this.state;
    this.setState({counter : counter + 1});
    console.log(`${counter + 1}`);
  }

  render= ()  =>{
    const {name, counter}= this.state;
    return(
      <div className="App"> 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handlePClick}>
          {name}
        </p>
        <a
          onClick = {this.handleAClick}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Este é o link {counter}.
        </a>
      </header>
    </div>
    );
  }
}
*/


//Aula 13
/* function App() { //Precisa iniciar com letra maiúscula componentes do react
  return ( //retorna uma espécie de html- componente jsx
    //Retorna apenas um elemento pai, não é possível retonar duas div por exemplo.
    //Esse é um componente stateless
    <div className="App"> 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */



export default Home;
