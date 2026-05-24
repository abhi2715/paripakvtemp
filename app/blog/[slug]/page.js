import { blogsData } from '../../../lib/blogsData';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';

// Tell Next.js which paths to pre-render at build time
export function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = blogsData.find((b) => b.slug === resolvedParams.slug);
  if (!blog) return { title: 'Blog Not Found' };
  
  return {
    title: `${blog.title} - Paripakv Foundation`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const blog = blogsData.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    return (
      <>
        <Navbar />
        <main className="section max-width" style={{ textAlign: 'center', paddingTop: '150px' }}>
          <h2>Blog post not found</h2>
          <a href="/#blogs" style={{ color: '#d4845a', textDecoration: 'underline' }}>Return to Blogs</a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ background: '#f9f4ef', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
        <article className="max-width" style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', position: 'relative' }}>
          
          <div style={{ marginBottom: '30px' }}>
             <a href="/#blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#d4845a', fontWeight: '600', textDecoration: 'none', transition: 'opacity 0.2s' }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="19" y1="12" x2="5" y2="12"></line>
                 <polyline points="12 19 5 12 12 5"></polyline>
               </svg>
               More Insights
             </a>
          </div>

          <header style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div style={{ color: '#d4845a', fontWeight: '600', marginBottom: '15px' }}>
              {blog.date}
            </div>
            <h1 style={{ fontSize: '2.5rem', color: '#1d1d1d', lineHeight: '1.3', marginBottom: '30px' }}>
              {blog.title}
            </h1>
            
            {blog.image && (
              <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '15px', overflow: 'hidden' }}>
                <Image 
                  src={blog.image} 
                  alt={blog.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 800px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
          </header>

          <div 
            style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#333' }}
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />

          <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #eee', textAlign: 'center' }}>
             <a href="/#contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #E8A87C, #d4845a)', color: '#fff', padding: '12px 30px', borderRadius: '30px', fontWeight: '600', textDecoration: 'none' }}>
               Join Us
             </a>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
