export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      content: {
        Row: {
          id: string
          section: string
          key: string
          value: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          key: string
          value?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          key?: string
          value?: string | null
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          price_min: number
          price_max: number
          currency: string
          features: Json
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price_min?: number
          price_max?: number
          currency?: string
          features?: Json
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price_min?: number
          price_max?: number
          currency?: string
          features?: Json
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          tags: string[]
          project_url: string | null
          github_url: string | null
          price_range: string | null
          is_featured: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          tags?: string[]
          project_url?: string | null
          github_url?: string | null
          price_range?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          tags?: string[]
          project_url?: string | null
          github_url?: string | null
          price_range?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          session_token: string
          user_name: string | null
          user_email: string | null
          user_ip: string | null
          metadata: Json
          created_at: string
          last_active_at: string
        }
        Insert: {
          id?: string
          session_token: string
          user_name?: string | null
          user_email?: string | null
          user_ip?: string | null
          metadata?: Json
          created_at?: string
          last_active_at?: string
        }
        Update: {
          id?: string
          session_token?: string
          user_name?: string | null
          user_email?: string | null
          user_ip?: string | null
          metadata?: Json
          created_at?: string
          last_active_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          role: 'user' | 'assistant'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: 'user' | 'assistant'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: 'user' | 'assistant'
          content?: string
          created_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          service_id: string | null
          budget: string | null
          message: string
          status: 'new' | 'read' | 'replied' | 'closed'
          admin_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          service_id?: string | null
          budget?: string | null
          message: string
          status?: 'new' | 'read' | 'replied' | 'closed'
          admin_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          service_id?: string | null
          budget?: string | null
          message?: string
          status?: 'new' | 'read' | 'replied' | 'closed'
          admin_notes?: string | null
          created_at?: string
        }
      }
      ai_config: {
        Row: {
          id: string
          system_prompt: string
          model: string
          temperature: number
          is_active: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          system_prompt: string
          model?: string
          temperature?: number
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          system_prompt?: string
          model?: string
          temperature?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string | null
          updated_at?: string
        }
      }
    }
  }
}
