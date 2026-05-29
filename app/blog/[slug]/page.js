import { blogsData } from '../../../lib/blogsData';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

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
  let blog = blogsData.find((b) => b.slug === resolvedParams.slug);

  try {
    // Fetch from live admin API
    const res = await fetch(`https://paripakv-admin.vercel.app/api/public/blogs/${resolvedParams.slug}`, { cache: 'no-store' });
    if (res.ok) {
      const apiBlog = await res.json();
      if (apiBlog && (apiBlog.slug === resolvedParams.slug || apiBlog._id === resolvedParams.slug)) {
        blog = {
          slug: apiBlog.slug || apiBlog._id,
          image: apiBlog.coverImage || '/images/Hero section images/image 2.png',
          date: apiBlog.createdAt ? new Date(apiBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date',
          title: apiBlog.title,
          excerpt: apiBlog.excerpt || (apiBlog.content
            ? apiBlog.content
                .replace(/<[^>]+>/g, ' ')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/\s+/g, ' ')
                .trim()
                .substring(0, 150) + '...'
            : 'No excerpt available'),
          content: apiBlog.content
        };
      }
    }
  } catch (err) {
    console.warn('Failed to fetch blog from admin API, falling back to static data');
  }

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
      <main style={{ background: 'var(--dark)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
        <article className="max-width" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--dark-card)', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
          
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
              {blog.date !== 'Invalid Date' ? blog.date : ''}
            </div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--white)', lineHeight: '1.3', marginBottom: '30px' }}>
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

          {blog.content ? (
            <div 
              style={{ 
                fontSize: '1.15rem', 
                lineHeight: '1.8', 
                color: 'var(--text-muted)',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                wordBreak: 'break-word'
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} 
              className="blog-rich-content"
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              No content available.
            </div>
          )}

          <style dangerouslySetInnerHTML={{__html: `
            .blog-rich-content img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
            }
            .blog-rich-content p {
              margin-bottom: 1.5em;
            }
          `}} />

          <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid var(--dark-light)', textAlign: 'center' }}>
             <a href="/#contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #E8A87C, #d4845a)', color: 'var(--dark)', padding: '12px 30px', borderRadius: '30px', fontWeight: '600', textDecoration: 'none' }}>
               Join Us
             </a>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
