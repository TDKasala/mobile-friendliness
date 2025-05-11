
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { blogArticles } from "@/data/blogArticles";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredArticles = blogArticles.filter(article => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-1">
        {/* Blog Header */}
        <section className="bg-gradient-to-r from-sa-blue to-sa-blue/80 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              ATSBoost Job Seeker Blog
            </h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Expert advice and ultra-affordable solutions to help South African job seekers optimize their CVs at atsboost.co.za
            </p>
          </div>
        </section>
        
        {/* Search Bar */}
        <section className="container mx-auto px-4 py-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sa-gray" size={18} />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </section>
        
        {/* Blog Articles */}
        <section className="container mx-auto px-4 py-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-sa-gray">No articles found matching your search.</h3>
              <p className="mt-2">Try adjusting your search terms or browse our latest articles below.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link to={`/blog/${article.slug}`} key={article.id}>
                  <Card className="h-full hover:shadow-md transition-shadow duration-300">
                    <div 
                      className="w-full h-48 bg-cover bg-center rounded-t-lg" 
                      style={{ backgroundImage: `url(${article.coverImage})` }}
                    />
                    <CardHeader>
                      <CardTitle className="text-xl text-sa-blue hover:text-sa-green transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="flex justify-between text-sm">
                        <span>{article.author}</span>
                        <span>{article.publishDate}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sa-gray line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between text-sm text-sa-gray">
                      <div className="flex items-center gap-1">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {article.readTime} min read
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-sa-blue/10 text-sa-blue px-2 py-0.5 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 2 && (
                          <span className="text-xs">+{article.tags.length - 2}</span>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
        
        {/* Subscribe Section */}
        <section className="bg-sa-green/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-sa-blue mb-4">
              Get Weekly CV Tips
            </h2>
            <p className="text-sa-gray max-w-xl mx-auto mb-6">
              Subscribe to our newsletter for free South African job market insights and get access to our highly affordable CV optimization tools at atsboost.co.za.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Your email address" 
                className="flex-1"
              />
              <button className="bg-sa-green hover:bg-sa-green/90 text-white py-2 px-6 rounded transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
