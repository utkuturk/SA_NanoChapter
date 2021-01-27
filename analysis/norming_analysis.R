
#### DATA -----
# Call data
df <- read.csv("results/results", #location
                                 header = F, #the first row is not the column names
                                 comment.char = "#", #disregard everything that starts with "#". Think about it why?
                                 encoding = "UTF-8" , #utf8 because turkish
                                 col.names = paste0("V",seq_len(11)), #create new column names just incase
                                 fill = TRUE, # When there is a blank line, just add it to the df and specify it as it is for later cleaning
                                 stringsAsFactors = FALSE) #do not take strings as factor. "why?"
# give columns names
colnames(df) = c("Time", "MD5", "ControllerType",  #names for columns
                                   "SentenceNoInStimFile", "Element", "exp_condition", 
                                   "item", "Sentence", "Question","Answer", "RT")
# create subject ids
subject_id <- with(df, { as.integer(as.factor(paste(Time, MD5))) })
df$subject <- sprintf("S[%d]", subject_id + 0)

# extract form and the the real data
df_forms <- df %>% #extract form related stuff
  subset(ControllerType == "Form" ) %>% # by specifying not dashedacceptability
  gdata::drop.levels()
df_practive <- df %>% subset(ControllerType == "MyPractice")
df %<>% subset(ControllerType == "AcceptabilityJudgment") 
df$subject %<>% as.factor()
df$exp_condition %<>% as.factor()
df$RT %<>% as.integer()
#extract ages and native language
# age <- df_forms_grammatialBias %>% dplyr::filter(Sentence == "age") %>% 
#   dplyr::select(subject, age = Question)
# natturk <- df_forms_grammatialBias %>% dplyr::filter(Sentence == "natturk") %>% 
#   dplyr::select(subject, natturk = Question)
# natturk$natturk <- ifelse(natturk$natturk == "male", "nat_turk", "nat_non_turk")
# forms_grammatialBias <- dplyr::left_join(age, natturk, by = "subject")
# form_out <- "workspace/grammaticalBias_form.rds"
# saveRDS(forms_grammatialBias, file = form_out)

#extract stim and responses
stopifnot( nrow(df) %% 2 == 0 )
rows_stim_df <- df[c(T,F),]
rows_response_df <- df[c(F,T),]
stopifnot( all(is.na( rows_stim_df$RT )) )
stopifnot( nrow(df_practive) %% 2 == 0 )
rows_stim_df_practice <- df_practive[c(T,F),]
rows_response_df_practice <- df_practive[c(F,T),]
stopifnot( all(is.na( rows_stim_df_practice$RT )) )

#check for practice accuracy
rows_response_df_practice %<>% 
  dplyr::select(-MD5, -Time, -ControllerType, -Sentence, -Element, -Answer, -item,) %>%
  dplyr::rename(Response=Question)


# exclude participants who did less than 0.6 in practice items
rows_response_df_practice %>% subset(Response == "NULL")
rows_response_df_practice$Response %<>%  as.integer()
rows_response_df_practice %>% group_by(subject) %>% mutate(delta = max(Response)-min(Response)) 
#delete S[1]

rows_response_df  %<>% subset(subject != "S[1]")

#prepare data for analysis.
rows_response_df %<>% 
  dplyr::select(-MD5, -Time, -ControllerType, -Sentence, -Element, -Answer) %>%
  dplyr::rename(rating=Question) 

rows_response_df$rating %<>% as.integer()
rows_response_df$item %<>% as.factor()
rows_response_df$SentenceNoInStimFile %<>% as.factor()

# add trial no
rows_response_df %<>% group_by(subject) %>% mutate(trial_no = seq(subject))


conditions_info <- data.frame(
  exp_condition = c("condition_datve", "condition_datyada", "condition_ve", "condition_yada"),
  condition =     c("datve",           "datyada",           "ve",           "yada"          ),
  grammatical =   c("gram",            "gram",              "weird",        "weird"         ),
  susp_aff =      c(F,                 F,                   T,              T               ),
  conjoiner =     c("ve",              "yada",              "ve",           "yada"          ),
  stringsAsFactors = FALSE
)


ratings <- rows_response_df %>% 
  dplyr::select(-SentenceNoInStimFile) %>% 
  left_join(conditions_info, by = "exp_condition")








# create lists of dataframes with averages in it for RT, RT correct and response accuracy
avg_clean <- list()
avg_clean$resp <- ratings %>% 
  plyr::ddply(c("condition"), function(df) {
    df %>% se_cousineau(n_conditions = 4, subject, DV = rating, 
                        group = c("conjoiner", "susp_aff"), 
                        is_proportion = TRUE)
  })

avg_clean$rt <- ratings %>%
  plyr::ddply(c("condition"), function(df) {
    df %>% se_cousineau(n_conditions = 4, subject, DV = RT, 
                        group = c("conjoiner", "susp_aff"), 
                        is_proportion = FALSE)
  })


avg_exp1 <- avg_clean %>% 
  lapply(function(df) { df %>% subset(is.na(source) | experiment != "filler") })
avg_fillers1 <- avg_clean %>% 
  lapply(function(df) { df %>% subset(experiment == "filler") })


