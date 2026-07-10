export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      guest_evaluation_responses: {
        Row: {
          application_date: string
          brought_communities_closer: string
          class_code: string
          consent: boolean
          could_be_different: string | null
          created_at: string
          experience_rating: string
          guest_name: string
          id: string
          instructor: string
          message_to_students: string
          methodology_rating: string
          positive_point: string
          respect_shown: string
          students_interest: string
          testimonial_consent: string
          welcoming: string
          workshop: string
          would_participate_again: string
        }
        Insert: {
          application_date?: string
          brought_communities_closer: string
          class_code?: string
          consent?: boolean
          could_be_different?: string | null
          created_at?: string
          experience_rating: string
          guest_name?: string
          id?: string
          instructor?: string
          message_to_students: string
          methodology_rating: string
          positive_point: string
          respect_shown: string
          students_interest: string
          testimonial_consent: string
          welcoming: string
          workshop?: string
          would_participate_again: string
        }
        Update: {
          application_date?: string
          brought_communities_closer?: string
          class_code?: string
          consent?: boolean
          could_be_different?: string | null
          created_at?: string
          experience_rating?: string
          guest_name?: string
          id?: string
          instructor?: string
          message_to_students?: string
          methodology_rating?: string
          positive_point?: string
          respect_shown?: string
          students_interest?: string
          testimonial_consent?: string
          welcoming?: string
          workshop?: string
          would_participate_again?: string
        }
        Relationships: []
      }
      student_post_class_3_responses: {
        Row: {
          application_date: string
          autonomous_research_readiness: string
          class_code: string
          class_number: number
          consent: boolean
          continue_using_handtalk: string
          created_at: string
          evolution_perception: string
          full_name: string
          handtalk_attention: string
          handtalk_presentation_rating: string
          handtalk_usage_success: string
          handtalk_usefulness: string
          id: string
          instructor: string
          knew_handtalk: string
          learning_rating: string
          main_learning: string
          methodology_rating: string
          objects_activity_contribution: string
          parameters_comprehension: string
          suggestion: string | null
          topic_to_learn: string
          whatsapp: string
          workshop: string
        }
        Insert: {
          application_date?: string
          autonomous_research_readiness: string
          class_code?: string
          class_number?: number
          consent?: boolean
          continue_using_handtalk: string
          created_at?: string
          evolution_perception: string
          full_name: string
          handtalk_attention: string
          handtalk_presentation_rating: string
          handtalk_usage_success: string
          handtalk_usefulness: string
          id?: string
          instructor?: string
          knew_handtalk: string
          learning_rating: string
          main_learning: string
          methodology_rating: string
          objects_activity_contribution: string
          parameters_comprehension: string
          suggestion?: string | null
          topic_to_learn: string
          whatsapp: string
          workshop?: string
        }
        Update: {
          application_date?: string
          autonomous_research_readiness?: string
          class_code?: string
          class_number?: number
          consent?: boolean
          continue_using_handtalk?: string
          created_at?: string
          evolution_perception?: string
          full_name?: string
          handtalk_attention?: string
          handtalk_presentation_rating?: string
          handtalk_usage_success?: string
          handtalk_usefulness?: string
          id?: string
          instructor?: string
          knew_handtalk?: string
          learning_rating?: string
          main_learning?: string
          methodology_rating?: string
          objects_activity_contribution?: string
          parameters_comprehension?: string
          suggestion?: string | null
          topic_to_learn?: string
          whatsapp?: string
          workshop?: string
        }
        Relationships: []
      }
      student_post_class_responses: {
        Row: {
          application_date: string
          class_code: string
          class_number: number
          communication_readiness: string
          consent: boolean
          created_at: string
          full_name: string
          grammar_understanding: string
          guest_attention: string
          guest_contribution: string
          id: string
          instructor: string
          learning_rating: string
          methodology_rating: string
          most_important_parameter: string
          most_significant_content: string
          parameters_importance: string
          perception_change: string
          suggestion: string | null
          topic_to_deepen: string
          whatsapp: string
          workshop: string
        }
        Insert: {
          application_date?: string
          class_code?: string
          class_number?: number
          communication_readiness: string
          consent?: boolean
          created_at?: string
          full_name: string
          grammar_understanding: string
          guest_attention: string
          guest_contribution: string
          id?: string
          instructor?: string
          learning_rating: string
          methodology_rating: string
          most_important_parameter: string
          most_significant_content: string
          parameters_importance: string
          perception_change: string
          suggestion?: string | null
          topic_to_deepen: string
          whatsapp: string
          workshop?: string
        }
        Update: {
          application_date?: string
          class_code?: string
          class_number?: number
          communication_readiness?: string
          consent?: boolean
          created_at?: string
          full_name?: string
          grammar_understanding?: string
          guest_attention?: string
          guest_contribution?: string
          id?: string
          instructor?: string
          learning_rating?: string
          methodology_rating?: string
          most_important_parameter?: string
          most_significant_content?: string
          parameters_importance?: string
          perception_change?: string
          suggestion?: string | null
          topic_to_deepen?: string
          whatsapp?: string
          workshop?: string
        }
        Relationships: []
      }
      student_pre_course_survey_responses: {
        Row: {
          biggest_difficulty: string
          class_code: string
          company: string
          consent: boolean
          created_at: string
          email: string | null
          facebook: string | null
          full_name: string
          future_courses_interest: string
          has_attended_deaf_person: string
          id: string
          initial_confidence_score: number
          instagram: string | null
          learning_expectation: string
          previous_libras_contact: string
          role: string
          usage_context: string
          usefulness_expectation: string
          whatsapp: string
        }
        Insert: {
          biggest_difficulty: string
          class_code?: string
          company: string
          consent?: boolean
          created_at?: string
          email?: string | null
          facebook?: string | null
          full_name: string
          future_courses_interest: string
          has_attended_deaf_person: string
          id?: string
          initial_confidence_score: number
          instagram?: string | null
          learning_expectation: string
          previous_libras_contact: string
          role: string
          usage_context: string
          usefulness_expectation: string
          whatsapp: string
        }
        Update: {
          biggest_difficulty?: string
          class_code?: string
          company?: string
          consent?: boolean
          created_at?: string
          email?: string | null
          facebook?: string | null
          full_name?: string
          future_courses_interest?: string
          has_attended_deaf_person?: string
          id?: string
          initial_confidence_score?: number
          instagram?: string | null
          learning_expectation?: string
          previous_libras_contact?: string
          role?: string
          usage_context?: string
          usefulness_expectation?: string
          whatsapp?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
