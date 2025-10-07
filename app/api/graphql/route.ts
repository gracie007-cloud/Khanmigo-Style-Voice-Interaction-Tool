import { type NextRequest, NextResponse } from "next/server"

// GraphQL schema definition
const typeDefs = `
  type Query {
    session(id: ID!): Session
    sessions: [Session!]!
  }

  type Mutation {
    createSession: Session!
    addTranscript(sessionId: ID!, text: String!, confidence: Float!): Transcript!
    deleteSession(id: ID!): Boolean!
  }

  type Subscription {
    transcriptAdded(sessionId: ID!): Transcript!
  }

  type Session {
    id: ID!
    createdAt: String!
    transcripts: [Transcript!]!
  }

  type Transcript {
    id: ID!
    text: String!
    confidence: Float!
    timestamp: String!
    isFinal: Boolean!
  }
`

// In-memory storage (replace with database in production)
const sessions = new Map<string, any>()

// Resolvers
const resolvers = {
  Query: {
    session: (_: any, { id }: { id: string }) => {
      return sessions.get(id) || null
    },
    sessions: () => {
      return Array.from(sessions.values())
    },
  },
  Mutation: {
    createSession: () => {
      const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const session = {
        id,
        createdAt: new Date().toISOString(),
        transcripts: [],
      }
      sessions.set(id, session)
      return session
    },
    addTranscript: (
      _: any,
      { sessionId, text, confidence }: { sessionId: string; text: string; confidence: number },
    ) => {
      const session = sessions.get(sessionId)
      if (!session) {
        throw new Error("Session not found")
      }

      const transcript = {
        id: `transcript_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text,
        confidence,
        timestamp: new Date().toISOString(),
        isFinal: true,
      }

      session.transcripts.push(transcript)
      return transcript
    },
    deleteSession: (_: any, { id }: { id: string }) => {
      return sessions.delete(id)
    },
  },
}

// Simple GraphQL executor
function executeGraphQL(query: string, variables: any = {}) {
  // This is a simplified implementation
  // In production, use a proper GraphQL library like Apollo Server or GraphQL Yoga

  if (query.includes("createSession")) {
    return { data: { createSession: resolvers.Mutation.createSession() } }
  }

  if (query.includes("addTranscript")) {
    return {
      data: {
        addTranscript: resolvers.Mutation.addTranscript(null, variables),
      },
    }
  }

  if (query.includes("session(")) {
    return { data: { session: resolvers.Query.session(null, variables) } }
  }

  if (query.includes("sessions")) {
    return { data: { sessions: resolvers.Query.sessions() } }
  }

  return { errors: [{ message: "Query not supported" }] }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, variables } = body

    const result = executeGraphQL(query, variables)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] GraphQL error:", error)
    return NextResponse.json(
      {
        errors: [{ message: "Internal server error" }],
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "GraphQL endpoint - use POST with query and variables",
    schema: typeDefs,
  })
}
