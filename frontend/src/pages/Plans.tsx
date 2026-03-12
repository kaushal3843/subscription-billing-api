import { useEffect, useState } from "react"
import API from "../api/api"
import Navbar from "../components/Sidebar"

function Plans() {
  const [plans, setPlans] = useState<any[]>([])
  const [activePlanId, setActivePlanId] = useState<number | null>(null) // Track the user's current plan
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const dataInitialization = async () => {
      setLoading(true)
      await Promise.all([fetchPlans(), fetchUserSubscription()])
      setLoading(false)
    }
    dataInitialization()
  }, [])

  const fetchPlans = async () => {
    try {
      const res = await API.get("/plans")
      setPlans(res.data)
    } catch (error) {
      console.error("Error fetching plans:", error)
    }
  }

  const fetchUserSubscription = async () => {
    try {
      // Assuming you have an endpoint that returns the current user's active sub
      const res = await API.get("/subscriptions/me") 
      if (res.data && res.data.plan_id) {
        setActivePlanId(res.data.plan_id)
      }
    } catch (error) {
      // If 404 or no sub, just keep it null
      console.log("No active subscription found.")
      setActivePlanId(null)
    }
  }

  const subscribePlan = async (planId: number) => {
    try {
      await API.post(`/subscriptions/${planId}`)
      alert("Subscribed successfully!")
      setActivePlanId(planId) // Update UI immediately
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Subscription failed"
      alert(errorMessage)
    }
  }

  if (loading) return <div className="text-white p-10">Loading plans...</div>

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-slate-900 to-blue-950 overflow-x-hidden">
      <Navbar />
      <div className="p-10">
        <h1 className="text-4xl text-white font-bold mb-10">Available Plans</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSubscribed = activePlanId === plan.id

            return (
              <div
                key={plan.id}
                className={`p-8 rounded-2xl shadow-lg transition border-2 ${
                  isSubscribed 
                  ? "bg-slate-700 border-blue-500 scale-105" 
                  : "bg-slate-800 border-transparent hover:scale-105"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl text-white font-bold mb-3">{plan.name}</h2>
                  {isSubscribed && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full uppercase">
                      Active
                    </span>
                  )}
                </div>

                <p className="text-gray-400 mb-2">Price: ₹{plan.price}</p>
                <p className="text-gray-400 mb-6">Duration: {plan.duration_days} days</p>

                <button
                  onClick={() => !isSubscribed && subscribePlan(plan.id)}
                  disabled={isSubscribed}
                  className={`w-full px-6 py-2 rounded-lg font-semibold transition ${
                    isSubscribed
                      ? "bg-green-600 cursor-default text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isSubscribed ? "Current Plan" : "Subscribe"}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Plans