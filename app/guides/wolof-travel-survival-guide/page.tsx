import Link from 'next/link'
import { ArrowRight, Bus, MapPin, ShoppingBag, AlertCircle, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
    title: 'The Ultimate Wolof Travel Survival Guide | Learn Wolof',
    description: 'Essential Wolof phrases for travelers in Senegal and The Gambia. Learn how to take taxis, bargain in markets, order food, and handle emergencies.',
}

export default function TravelSurvivalGuidePage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="space-y-6 text-center mb-12">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    Traveler&apos;s Companion
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    The Ultimate Wolof Travel Survival Guide
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Navigate Senegal and The Gambia with confidence. From bargaining at the market to catching a Ndiaga Ndiaye bus, these phrases will get you where you need to go.
                </p>
            </div>

            <div className="space-y-12">
                {/* Section 1: Transport */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <Bus className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold">Getting Around</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <PhraseCard
                            wolof="Fan la garage bus bi nekk?"
                            english="Where is the bus station?"
                            context="Use 'garage' for transport depots."
                        />
                        <PhraseCard
                            wolof="Bëgg naa dem Dakar."
                            english="I want to go to Dakar."
                            context="Replace 'Dakar' with your destination."
                        />
                        <PhraseCard
                            wolof="Ñaata la tiket bi?"
                            english="How much is the ticket?"
                            context="Always ask the price before boarding."
                        />
                        <PhraseCard
                            wolof="Bu la neexee, taagal fi."
                            english="Please stop here."
                            context="Say this loudly when you reach your stop."
                        />
                    </div>
                    <div className="mt-4">
                        <Button asChild variant="outline">
                            <Link href="/phrases/travel">View All Travel Phrases <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </section>

                {/* Section 2: Market & Money */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold">Money & Bargaining</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <PhraseCard
                            wolof="Ñaata la?"
                            english="How much is this?"
                            context="The most important phrase for shopping."
                        />
                        <PhraseCard
                            wolof="Dafa seer."
                            english="It is expensive."
                            context="Use this to start negotiating."
                        />
                        <PhraseCard
                            wolof="Mën nga ci waññi?"
                            english="Can you reduce the price?"
                            context="Bargaining is expected in markets."
                        />
                        <PhraseCard
                            wolof="Am nga monéet?"
                            english="Do you have change?"
                            context="Small change is often scarce."
                        />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <Button asChild variant="outline">
                            <Link href="/phrases/market">Market Phrases <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/words/numbers">Learn Numbers <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </section>

                {/* Section 3: Essential Needs */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                            <Utensils className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold">Food & Essentials</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <PhraseCard
                            wolof="Am naa ndox?"
                            english="Is there water?"
                            context="Essential for staying hydrated."
                        />
                        <PhraseCard
                            wolof="Dama xiif."
                            english="I am hungry."
                            context="Xiif = hungry."
                        />
                        <PhraseCard
                            wolof="Fan la wanag wi nekk?"
                            english="Where is the toilet?"
                            context="Wanag = toilet."
                        />
                        <PhraseCard
                            wolof="Jërëjëf, sur naa."
                            english="Thank you, I am full."
                            context="Polite way to decline more food."
                        />
                    </div>
                    <div className="mt-4">
                        <Button asChild variant="outline">
                            <Link href="/words/food">Food Vocabulary <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                    </div>
                </section>

                {/* Section 4: Emergency */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold">Help & Emergency</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <PhraseCard
                            wolof="Dimbali ma!"
                            english="Help me!"
                            context="Use in urgent situations."
                        />
                        <PhraseCard
                            wolof="Dama feebar."
                            english="I am sick."
                            context="Feebar = sick."
                        />
                        <PhraseCard
                            wolof="Wooyal doktoor."
                            english="Call a doctor."
                            context="Wooyal = call for someone."
                        />
                        <PhraseCard
                            wolof="Maa ngi dem lopitaan."
                            english="I am going to the hospital."
                            context="Lopitaan = hospital."
                        />
                    </div>
                </section>
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 text-center">
                <h2 className="text-2xl font-bold mb-4">Safe Travels!</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Learning just a few of these phrases will earn you respect and smiles wherever you go.
                    <br />
                    <em>Yoon wi jàmm!</em> (Have a safe journey!)
                </p>
                <Button asChild size="lg" variant="default">
                    <Link href="/phrases">
                        Explore All Phrases <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}

function PhraseCard({ wolof, english, context }: { wolof: string, english: string, context: string }) {
    return (
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-primary">{wolof}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-medium text-foreground mb-1">{english}</p>
                <p className="text-sm text-muted-foreground italic">{context}</p>
            </CardContent>
        </Card>
    )
}
