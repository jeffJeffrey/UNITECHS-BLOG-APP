import { createContext, useContext, useState } from "react";

const initialArticles = [
  {
    id: 1,
    slug: "introduction-react",
    title: "Introduction à React",
    category: "React",
    author: "Marie Dupont",
    authorId: 1,
    image: "https://picsum.photos/400/250?random=1",
    content: `React est une bibliothèque JavaScript pour construire des interfaces utilisateur. Elle permet de créer des applications web interactives et dynamiques...

React utilise un système de composants réutilisables qui rendent le développement plus modulaire et maintenable. Le Virtual DOM optimise les performances en minimisant les manipulations du DOM réel.

Les hooks comme useState et useEffect permettent de gérer l'état et les effets de bord dans les composants fonctionnels, simplifiant considérablement le développement.`,
    date: "2024-01-15",
    readTime: "5 min",
  },
  {
    id: 2,
    slug: "hooks-avances",
    title: "Hooks avancés en React",
    category: "React",
    author: "Pierre Martin",
    authorId: 2,
    image: "https://picsum.photos/400/250?random=2",
    content: `Les hooks avancés comme useCallback, useMemo et useContext permettent d'optimiser les performances et de gérer des états complexes...

useCallback permet de mémoriser des fonctions pour éviter les re-renders inutiles. useMemo optimise les calculs coûteux. useContext facilite le partage de données entre composants.

Ces outils sont essentiels pour développer des applications React performantes et maintenables à grande échelle.`,
    date: "2024-01-20",
    readTime: "8 min",
  },
  {
    id: 3,
    slug: "tailwind-css-guide",
    title: "Guide complet Tailwind CSS",
    category: "CSS",
    author: "Marie Dupont",
    authorId: 1,
    image: "https://picsum.photos/400/250?random=3",
    content: `Tailwind CSS est un framework CSS utilitaire qui permet de construire des interfaces rapidement sans écrire de CSS personnalisé...

Avec ses classes utilitaires, Tailwind offre une approche différente du CSS traditionnel. Au lieu d'écrire des styles personnalisés, on combine des classes prédéfinies.

Cette approche améliore la cohérence visuelle et accélère le développement tout en maintenant une grande flexibilité de design.`,
    date: "2024-01-25",
    readTime: "12 min",
  },
  {
    id: 4,
    slug: "javascript-moderne",
    title: "JavaScript Moderne ES6+",
    category: "JavaScript",
    author: "Paul Dubois",
    authorId: 3,
    image: "https://picsum.photos/400/250?random=4",
    content: `Les fonctionnalités modernes de JavaScript transforment la façon dont nous écrivons du code. Arrow functions, destructuring, async/await...

ES6+ apporte des syntaxes plus concises et expressives. Les modules permettent une meilleure organisation du code. Les Promises et async/await simplifient la gestion asynchrone.

Ces fonctionnalités sont devenues indispensables pour tout développeur JavaScript moderne.`,
    date: "2024-02-01",
    readTime: "10 min",
  },
  {
    id: 5,
    slug: "responsive-design",
    title: "Design Responsive avec CSS Grid",
    category: "CSS",
    author: "Sophie Leroy",
    authorId: 4,
    image: "https://picsum.photos/400/250?random=5",
    content: `CSS Grid révolutionne la création de layouts responsives. Cette technologie permet de créer des grilles complexes facilement...

Contrairement à Flexbox qui est unidimensionnel, Grid permet de contrôler simultanément les lignes et colonnes. Les media queries combinées à Grid offrent un contrôle total sur la responsivité.

Les techniques modernes de responsive design garantissent une expérience utilisateur optimale sur tous les appareils.`,
    date: "2024-02-05",
    readTime: "7 min",
  },
  {
    id: 6,
    slug: "node-api-rest",
    title: "Créer une API REST avec Node.js",
    category: "Backend",
    author: "Pierre Martin",
    authorId: 2,
    image: "https://picsum.photos/400/250?random=6",
    content: `Node.js permet de créer des APIs REST performantes côté serveur. Express.js simplifie la création des routes et middlewares...

Une API REST bien conçue respecte les principes RESTful : ressources identifiées par des URLs, méthodes HTTP appropriées, statelessness.

La validation des données, l'authentification et la gestion des erreurs sont cruciales pour une API robuste et sécurisée.`,
    date: "2024-02-10",
    readTime: "15 min",
  },
];

const initialAuthors = [
  {
    id: 1,
    name: "Marie Dupont",
    bio: "Développeuse Frontend spécialisée en React",
    avatar: "https://picsum.photos/100/100?random=10",
  },
  {
    id: 2,
    name: "Pierre Martin",
    bio: "Développeur Full-Stack passionné",
    avatar: "https://picsum.photos/100/100?random=11",
  },
  {
    id: 3,
    name: "Paul Dubois",
    bio: "Expert JavaScript et Node.js",
    avatar: "https://picsum.photos/100/100?random=12",
  },
  {
    id: 4,
    name: "Sophie Leroy",
    bio: "Designer UX/UI et intégratrice",
    avatar: "https://picsum.photos/100/100?random=13",
  },
];
const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState(initialArticles);
  const [authors, setAuthors] = useState(initialAuthors)

  const addArticle = (article) => {
    setArticles([...articles, article]);
  };
   const deleteArticle = (id) => {
   setArticles((prevItems) => prevItems.filter((item) => item.id !== id))

  }

  const updateArticle = (id, article) => {
    const existing = articles.find((item) => item.id === id)
    if(existing){
        const newArticles = articles.map((item) => item.id === id ? article : item)
        setArticles(newArticles)
    }
  }

  const addAuthors = (author) => {
    setAuthors([...authors, author])
  }
   const deleteAuthor = (id) => {
   setAuthors((prevItems) => prevItems.filter((item) => item.id !== id))

  }

  const updateAuthor = (id, author) => {
    const existing = authors.find((item) => item.id === id)
    if(existing){
        const newAuthors = authors.map((item) => item.id === id ? author : item)
        setAuthors(newAuthors)
    }
  }
 

  return (
    <ArticleContext.Provider value={{ articles, addArticle, deleteArticle, updateArticle,  authors, addAuthors, deleteAuthor, updateAuthor }}>
      {children}
    </ArticleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticles doit être utilisé dans AuthProvider");
  }

  return context;
};
