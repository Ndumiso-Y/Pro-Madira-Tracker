export default function Login() { return <div className="h-screen bg-brand-navy flex items-center justify-center p-4">
  <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col items-center">
    <img src="/ProMadiraLogoTransparent.png" alt="Logo" className="h-20 mb-8 object-contain" />
    <h1 className="text-2xl font-bold text-slate-800 mb-6">Sign in to your account</h1>
    <form className="w-full space-y-4 text-left">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
        <input type="email" className="w-full p-2 border border-slate-300 rounded-md focus:ring-brand-accent focus:border-brand-accent text-slate-800" placeholder="user@promodira.co.za" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input type="password" className="w-full p-2 border border-slate-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" placeholder="••••••••" />
      </div>
      <button type="button" className="w-full bg-brand-accent hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md mt-4 transition-colors">Sign in</button>
    </form>
  </div>
</div>; }
