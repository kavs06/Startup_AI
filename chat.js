/**
 * chat.js
 * AI Startup Coach Chatbot Simulator.
 * Simulates a Y Combinator-style partner (Paul Graham Bot) giving contextual advice.
 */

// Global reference to active startup plan
let activePlanForCoach = null;

function setCoachActivePlan(plan) {
  activePlanForCoach = plan;
  
  // Send greeting update
  const messagesBox = document.getElementById("chat-messages");
  if (messagesBox) {
    const greetingMsg = document.createElement("div");
    greetingMsg.className = "msg bot-msg";
    
    let text = `Excellent! I've reviewed your operating plan for **${plan.name}** in the **${plan.industry}** sector.\n\n`;
    text += `Your value proposition looks interesting. I notice you're targeting **${plan.audience}**. How are you thinking about acquiring your first 10 customers? Or would you like to discuss pricing models for this group?`;
    
    greetingMsg.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p><span class="msg-time">${getCurrentTimeStr()}</span>`;
    messagesBox.appendChild(greetingMsg);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
}

function handleSendChat(event) {
  if (event) event.preventDefault();
  
  const inputEl = document.getElementById("chat-input");
  const msgText = inputEl.value.trim();
  if (!msgText) return;
  
  // Clear input
  inputEl.value = "";
  
  // Append user message
  appendChatMessage(msgText, "user");
  
  // Trigger bot response after small delay
  setTimeout(() => {
    const botResponse = generateCoachResponse(msgText);
    appendChatMessage(botResponse, "bot");
  }, 750);
}

function sendSuggestedPrompt(text) {
  appendChatMessage(text, "user");
  setTimeout(() => {
    const botResponse = generateCoachResponse(text);
    appendChatMessage(botResponse, "bot");
  }, 600);
}

function appendChatMessage(text, sender) {
  const messagesBox = document.getElementById("chat-messages");
  if (!messagesBox) return;
  
  const msgEl = document.createElement("div");
  msgEl.className = `msg ${sender}-msg`;
  msgEl.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p><span class="msg-time">${getCurrentTimeStr()}</span>`;
  
  messagesBox.appendChild(msgEl);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function generateCoachResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  
  // Helper variables
  const startupName = activePlanForCoach ? activePlanForCoach.name : "your startup";
  const industry = activePlanForCoach ? activePlanForCoach.industry : "this space";
  const audience = activePlanForCoach ? activePlanForCoach.audience : "your target users";
  
  // Price / Pricing Keywords
  if (msg.includes("price") || msg.includes("pricing") || msg.includes("charge") || msg.includes("cost")) {
    return `Startups almost always price too low. There is a fear that if you charge more, users will leave. But if your product actually solves a severe problem, people will pay.
    
For **${startupName}**, since you are targeting **${audience}**, I suggest experimenting with pricing early on. If they refuse to pay a premium price, it's a warning sign: either you haven't built what they actually want, or the pain isn't severe enough.
    
Try charging 2x more than your initial estimate, and see where the friction begins. It is much easier to lower prices later than to raise them.`;
  }
  
  // Customer Acquisition / Marketing Keywords
  if (msg.includes("acquire") || msg.includes("user") || msg.includes("client") || msg.includes("sales") || msg.includes("customer") || msg.includes("market")) {
    return `In the early days of **${startupName}**, you must do things that don't scale.
    
Forget about Google Ads, SEO, or viral campaigns for now. You need to manually go and find 10 people in your target audience (**${audience}**) who have this problem today.
    
Go to forums, call friends, email contacts, and physically sit with them. Watch them use your rough prototype. Talk to them. If you cannot convince 10 people manually to use your service, you will never acquire 1,000 via automation.`;
  }
  
  // Competitor Keywords
  if (msg.includes("competitor") || msg.includes("competition") || msg.includes("alternative") || msg.includes("landscape")) {
    return `Startups rarely die from competition. They almost always die from suicide—by failing to build something people want.
    
Don't obsess over what other tools in **${industry}** are doing. Focus 100% of your energy on your active users.
    
If your product is 10x better at solving the core pain for **${audience}** than a clunky spreadsheet or legacy portal, competitors won't matter. Make your users happy, and the competition will take care of itself.`;
  }
  
  // MVP / Dev / Technical Scoping Keywords
  if (msg.includes("mvp") || msg.includes("build") || msg.includes("product") || msg.includes("feature") || msg.includes("launch")) {
    return `Your MVP should be embarrassingly simple. If it's not, you've spent too long building.
    
For **${startupName}**, identify the absolute single feature that solves the core problem you described. Strip everything else away: no social logins, no elaborate profile settings, no complex analytics panels.
    
Build that one core loop, put it in front of a real user, and see if they use it. You want to learn as fast as possible, and you only learn when real users interact with code.`;
  }
  
  // Funding / VC / Investment Keywords
  if (msg.includes("fund") || msg.includes("vc") || msg.includes("invest") || msg.includes("raise") || msg.includes("money")) {
    return `Raising money is not a milestone; it's a cost. The more money you raise, the more dilution you accept, and the more constraints you add to your board.
    
The best form of funding is revenue from your users. It gives you infinite leverage.
    
If you do decide to raise pre-seed or seek accelerator funding, make sure you show speed. Investors don't invest in static points; they invest in lines. They want to see that you went from idea to prototype, to 5 active pilots, in a matter of weeks. The roadmap we built for **${startupName}** is designed to show exactly that speed.`;
  }

  // Critique / Problem statement keywords
  if (msg.includes("critique") || msg.includes("problem statement") || msg.includes("pitch")) {
    if (!activePlanForCoach) {
      return `Please generate an operating plan first! I need a problem statement to critique.`;
    }
    return `Let's look at your problem statement for **${startupName}**:
    
*"${activePlanForCoach.problem}"*
    
It is clear that you are focusing on **${industry}**. To make this pitch YC-ready:
1. Ensure the pain is quantified. (e.g. 'Users waste 15 hours a week doing this manually' rather than just 'This is annoying').
2. Explain the insight. Why hasn't this been solved before? What changed in technology recently that makes your approach viable?
    
Keep it simple, avoid marketing buzzwords, and state exactly what you do in the first sentence.`;
  }

  // Fallback responses
  const fallbacks = [
    `The most important thing for **${startupName}** right now is to build something people want. Everything else is secondary. Are your early validation checkpoints moving forward?`,
    `A startup is like a science experiment. You formulate a hypothesis about a problem, and you test it. If the test fails, you iterate. What hypothesis are we testing this week?`,
    `Don't worry about scaling yet. Solve the problem for one person, then ten, then a hundred. Scale is a problem you earn the right to solve later.`,
    `Are you talking to your users? The answer to almost every startup question is: talk to your users. They will tell you what they are willing to pay for.`
  ];
  
  const randomIndex = Math.floor(Math.random() * fallbacks.length);
  return fallbacks[randomIndex];
}

function getCurrentTimeStr() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}
