
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogArticles } from "@/data/blogArticles";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the article with the matching slug
  const article = blogArticles.find(article => article.slug === slug);
  
  // If no article is found, redirect to the blog page
  useEffect(() => {
    if (!article) {
      navigate("/blog");
    }
  }, [article, navigate]);
  
  // If article is undefined, return null
  if (!article) {
    return null;
  }

  // Function to convert markdown headings to HTML and enhance content with affordability messaging
  const formatContent = (content: string) => {
    // Process headings
    let formattedContent = content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-5 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-4 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-3 mt-5">$1</h3>')
      // Process lists
      .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-2">• $1</li>')
      // Process paragraphs
      .split('\n\n').join('</p><p class="mb-4">');

    // Add ATSBoost mentions and affordability messaging
    formattedContent += `<p class="mb-4 bg-sa-green/10 p-4 rounded-md mt-8"><strong>Did you know?</strong> At atsboost.co.za, we offer the most affordable CV optimization tools designed specifically for the South African job market. Our prices are unbeatable, and our tools can significantly increase your chances of landing interviews!</p>`;
    
    formattedContent += `<p class="mb-4">Visit <a href="https://atsboost.co.za" class="text-sa-green font-semibold">atsboost.co.za</a> today to access our full range of highly effective and budget-friendly CV optimization tools designed specifically for South African job seekers.</p>`;

    return `<p class="mb-4">${formattedContent}</p>`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        {/* Article Header */}
        <section className="bg-gradient-to-r from-sa-blue to-sa-blue/80 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Link 
              to="/blog"
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Blog
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 max-w-4xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center text-white/90 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <span className="mr-1">By {article.author}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {article.authorTitle}
                </span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{article.publishDate}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div 
              className="w-full h-64 md:h-80 bg-cover bg-center rounded-lg mb-6"
              style={{ backgroundImage: `url(${article.coverImage})` }}
            />
            
            <div className="mb-6 flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-sa-blue/10 text-sa-blue px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="bg-sa-yellow/10 p-4 rounded-md mb-6">
              <p className="font-medium">
                Looking for affordable CV optimization? Visit <a href="https://atsboost.co.za" className="text-sa-green font-bold underline">atsboost.co.za</a> for the most cost-effective ATS tools in South Africa.
              </p>
            </div>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
            />
            
            {/* Author Bio */}
            <div className="border-t border-gray-200 mt-12 pt-8">
              <h3 className="text-xl font-semibold mb-2">About the Author</h3>
              <div className="flex items-start">
                <div className="bg-sa-gray/20 rounded-full h-12 w-12 flex items-center justify-center text-sa-gray font-bold text-xl">
                  {article.author[0]}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{article.author}</h4>
                  <p className="text-sa-gray">{article.authorTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Articles */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {blogArticles
                .filter(a => a.id !== article.id)
                .slice(0, 3)
                .map(relatedArticle => (
                  <Link to={`/blog/${relatedArticle.slug}`} key={relatedArticle.id}>
                    <Card className="h-full hover:shadow-md transition-shadow duration-300">
                      <div 
                        className="w-full h-40 bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: `url(${relatedArticle.coverImage})` }}
                      />
                      <CardContent className="pt-4">
                        <h3 className="text-lg font-semibold mb-2 text-sa-blue hover:text-sa-green transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sa-gray text-sm line-clamp-2">{relatedArticle.excerpt}</p>
                        <div className="flex justify-between items-center mt-4 text-xs text-sa-gray">
                          <span>{relatedArticle.publishDate}</span>
                          <span>{relatedArticle.readTime} min read</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-sa-green text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Optimize Your CV?
            </h2>
            <p className="max-w-xl mx-auto mb-6">
              Get your CV analyzed by ATSBoost for an incredibly affordable price at <a href="https://atsboost.co.za" className="underline font-semibold">atsboost.co.za</a> to increase your chances of landing interviews in the South African job market.
            </p>
            <Link 
              to="/"
              className="inline-flex bg-white text-sa-green hover:bg-white/90 font-medium py-3 px-6 rounded-lg transition"
            >
              Analyze My CV Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogArticle;
