import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ModeToggleTab from "@/components/ui/mode-toggle-tab";
import { router } from "@inertiajs/react";


const Welcome = () => {
    return (
        <main className="bg-background dark:bg-background min-h-screen flex flex-col">
            <div className="absolute top-4 right-4">
                <ModeToggleTab />
            </div>
            <section className="flex-1 flex flex-col justify-center items-center px-6">
                <motion.h1
                    className="text-primary dark:text-primary text-4xl md:text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Welcome to Soft Lab
                </motion.h1>

                <motion.p
                    className="text-muted-foreground dark:text-muted-foreground text-lg max-w-xl mb-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Discover powerful tools to boost your productivity. Sign up to get
                    started, or log in if you already have an account.
                </motion.p>

                <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <Button 
                        size="lg" 
                        className="rounded-2xl px-6"
                        onClick={() => router.visit('/auth/login')}
                    >
                        Login
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-2xl px-6">
                        Sign up
                    </Button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-6 text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </main>
    );
};

export default Welcome;
