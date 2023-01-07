export interface Commit {
    author: Author
    committer: Committer
    message: string
    tree: Tree,
    html_url: string
  }
  
  export interface Author {
    name: string
    email: string
    date: string
  }
  
  export interface Committer {
    name: string
    email: string
    date: string
  }
  
  export interface Tree {
    sha: string
    url: string
  }