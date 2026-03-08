import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, Camera, Lock, ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      // Load profile
      supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setFullName(data.full_name || "");
            setAvatarUrl(data.avatar_url || "");
          }
        });
    }
  }, [user, authLoading, navigate]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim(), avatar_url: avatarUrl.trim(), updated_at: new Date().toISOString() })
      .eq("id", user.id);
    
    // Also update user metadata
    await supabase.auth.updateUser({ data: { full_name: fullName.trim() } });
    
    setLoading(false);
    if (error) {
      toast({ title: "Failed to update profile", variant: "destructive" });
    } else {
      toast({ title: "Profile updated! ✅" });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordLoading(false);
    if (error) {
      toast({ title: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password changed! ✅" });
      setNewPassword("");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    await signOut();
    toast({ title: "Signed out. Contact support to permanently delete your data." });
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Profile Settings</h1>
          <p className="text-muted-foreground font-body mb-10">Manage your account and preferences</p>

          {/* Profile Info */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-body font-semibold text-foreground">{fullName || "Your Name"}</p>
                  <p className="text-xs text-muted-foreground font-body">{user?.email}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-body text-muted-foreground mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="pl-10 font-body rounded-xl" />
                </div>
              </div>

              <div>
                <label className="text-xs font-body text-muted-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={user?.email || ""} disabled className="pl-10 font-body rounded-xl bg-muted" />
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="text-xs font-body text-muted-foreground mb-1.5 block">Avatar URL</label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/photo.jpg" className="pl-10 font-body rounded-xl" />
                </div>
              </div>

              <Button onClick={handleSaveProfile} disabled={loading} className="gradient-accent text-accent-foreground font-body font-semibold rounded-full">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Changes
              </Button>
            </div>
          </motion.div>

          {/* Change Password */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 mb-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-body text-muted-foreground mb-1.5 block">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 6 characters" type="password" className="pl-10 font-body rounded-xl" />
                </div>
              </div>
              <Button onClick={handleChangePassword} disabled={passwordLoading} variant="outline" className="font-body rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                {passwordLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
                Update Password
              </Button>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 border-destructive/20">
            <h2 className="font-display font-semibold text-lg text-destructive mb-2">Danger Zone</h2>
            <p className="text-xs text-muted-foreground font-body mb-4">Permanently delete your account and all data.</p>
            <Button onClick={handleDeleteAccount} variant="outline" className="font-body rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
              Delete Account
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
