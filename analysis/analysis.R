# set working directory
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

# load packages
library(dplyr)
library(readxl)
library(magrittr)
library(tidyr)
library(janitor)
library(brms)
library(ggpubr)
library(cowplot)
library(bayesplot)
library(ggsci)
library(cmdstanr)

# function
se_cousineau <- function(df, n_conditions, subject, DV, group, is_proportion = NULL) {
  stopifnot(!"avgDV" %in% colnames(df))
  subject_var <- substitute(subject) %>%
    deparse() %>%
    gsub("\"", "", .)
  DV <- substitute(DV) %>%
    deparse() %>%
    gsub("\"", "", .)
  stopifnot(subject_var %in% colnames(df) && DV %in% colnames(df))

  subj_means <- df %>%
    group_by(.dots = subject_var) %>%
    dplyr::summarize(avgDV := mean(!!as.name(DV), na.rm = T),
      .groups = "drop"
    )
  GM <- mean(subj_means$avgDV)
  df %<>% group_by(.dots = subject_var) %>%
    dplyr::mutate(nDV = !!as.name(DV) - mean(!!as.name(DV), na.rm = T) + GM) %>%
    ungroup()

  if (is.null(is_proportion)) {
    dv <- df[[DV]]
    dv_unique <- unique(dv)
    if (is.logical(dv) || (length(dv_unique) == 2 && all(dv_unique %in% c(0, 1)))) {
      is_proportion <- TRUE
    } else {
      is_proportion <- FALSE
    }
  }

  var_correction_factor <- n_conditions / (n_conditions - 1)
  df %>%
    group_by(.dots = group) %>%
    dplyr::summarize(
      M = mean(nDV, na.rm = T),
      Var = ifelse(is_proportion, M * (1 - M), var(nDV, na.rm = T)) * var_correction_factor,
      N = sum(!is.na(nDV)),
      SE = sqrt(Var / N),
      .groups = "drop"
    )
}

prob_str <- function(p, gtst = 0.001) {
  if (p < .001) {
    str <- "< .001"
  } else if (p > .999) {
    str <- "> .999"
  } else if (p > .99 | p < .01) {
    str <- sprintf("  %.3f", p) %>% gsub("0\\.", ".", .)
  } else {
    str <- sprintf("   %.2f", p) %>% gsub("0\\.", ".", .)
  }
  str
}

model_summary <- function(m, include_pp_below_zero = T) {
  tbl <- fixef(m)[-1, -2] %>% as.data.frame()
  tbl$coef <- rownames(tbl)

  if (include_pp_below_zero) {
    cnames <- paste("b", tbl$coef, sep = "_")
    samples <- brms::posterior_samples(m, pars = cnames)
    stopifnot(ncol(samples) == length(cnames))

    pref_coef_stats_df <- function(df, name) {
      df %>% as.data.frame(colnames = "x") %T>%
        {
          colnames(.) <- name
        } %T>% {
          .$coef <- rownames(.) %>% gsub("^b_", "", .)
        }
    }

    p_below_zero <- samples %>%
      sapply(function(x) mean(x < 0)) %>%
      pref_coef_stats_df("PBelowZero")
    tbl %<>% left_join(p_below_zero, by = "coef")

    p_below_zero_str <- samples %>%
      sapply(function(x) mean(x < 0) %>% prob_str()) %>%
      pref_coef_stats_df("PBelowZeroStr")
    tbl %<>% left_join(p_below_zero_str, by = "coef")

    p_above_zero <- samples %>%
      sapply(function(x) mean(x > 0)) %>%
      pref_coef_stats_df("PAboveZero")
    tbl %<>% left_join(p_above_zero, by = "coef")

    p_above_zero_str <- samples %>%
      sapply(function(x) mean(x > 0) %>% prob_str()) %>%
      pref_coef_stats_df("PAboveZeroStr")
    tbl %<>% left_join(p_above_zero_str, by = "coef")
  }

  rownames(tbl) <- tbl$coef
  tbl
}


df <- read_excel("results_2021-02-09T14_54_08_538Z_SA_AAF.xlsx")
colnames(df) %<>% make_clean_names()
df %<>% subset(logged_in_as_experiment_owner_if_known != "yes")

# age


df %>% subset(field_name == "age") %>%
mutate(field_value = as.numeric(field_value)) %>%
subset(!is.na(field_value)) %>%
select(field_value) %>% droplevels() %>%
summarize(
  mean = mean(field_value),
  sd = sd(field_value),
  max = max(field_value),
  min = min(field_value)
)

practice <- df %>% subset(type == "practice" & !is.na(question_null_if_none))

practice %>% subset(whether_or_not_answer_was_correct_null_if_n_a == "NULL")
practice$whether_or_not_answer_was_correct_null_if_n_a[practice$whether_or_not_answer_was_correct_null_if_n_a == "NULL"] <- 0
practice$whether_or_not_answer_was_correct_null_if_n_a %<>% as.integer()
bad_subjects_by_practice <- practice %>%
  group_by(results_index) %>%
  summarize(p_yes = mean(whether_or_not_answer_was_correct_null_if_n_a)) %>%
  subset(p_yes <= 0.5) %>%
  .$results_index
results <- df %>%
  subset(type == "condition_datve" | type == "condition_ve" | type == "condition_yada" | type == "condition_datyada") %>%
  subset(!is.na(question_null_if_none))
results %<>% subset(results_index != 22)
results %<>% subset(results_index != 44)
results %<>% subset(results_index != 71)
results %<>% subset(results_index != 93)
results %<>% subset(results_index != 146)
results %<>% subset(results_index != 154)
results %<>% subset(results_index != 163)
results %<>% subset(results_index != 174)


results %<>% select(
  -time, -counter, -hash, -logged_in_as_experiment_owner_if_known,
  -element_number, -field_name, -field_value, -sentence_or_sentence_md5,
  -question_null_if_none, -whether_or_not_answer_was_correct_null_if_n_a
)


results$response_yes <- ifelse(grepl("P'ye", results$answer), T,
  ifelse(grepl("Q'ya", results$answer), F, NA)
)

results %<>% select(-answer)
results %<>% subset(!is.na(response_yes))

# results$grammatical <- ifelse(results$type == "condition_datve" | results$type == "condition_datyada", T, F)
results$no_sa <- ifelse(results$type == "condition_datve" | results$type == "condition_datyada", T, F)
results$vowel_match_conj <- ifelse(results$type == "condition_datve" | results$type == "condition_ve", T, F)

# results %<>% mutate(ResponseCorrect = (response_yes == (grammatical == T) ) )
results %<>% subset(!(time_taken_to_answer > 2000 | time_taken_to_answer < 200))

avg_clean <- list()
avg_clean$resp <- results %>%
  plyr::ddply(c("type"), function(df) {
    df %>% se_cousineau(
      n_conditions = 4, results_index, DV = response_yes,
      group = c("no_sa", "vowel_match_conj"),
      is_proportion = TRUE
    )
  })

avg_clean$rt <- results %>%
  plyr::ddply(c("type"), function(df) {
    df %>% se_cousineau(
      n_conditions = 4, results_index, DV = time_taken_to_answer,
      group = c("no_sa", "vowel_match_conj"),
      is_proportion = FALSE
    )
  })

avg_clean$rt_correct <- results %>%
  subset(ResponseCorrect) %>%
  plyr::ddply(c("type"), function(df) {
    df %>% se_cousineau(
      n_conditions = 4, results_index, DV = time_taken_to_answer,
      group = c("no_sa", "vowel_match_conj"),
      is_proportion = FALSE
    )
  })
avg_clean$resp$CI = avg_clean$resp$SE * 1.96
# desc plot
p_avg =
avg_clean$resp %>%
  ggplot(aes(rev(no_sa), M,
    color = vowel_match_conj,
    group = vowel_match_conj
  )) +
  geom_point(size = 3) +
  geom_line(linewidth = 1) +
  geom_errorbar(
    aes(
      ymin = M - 1.96 * SE,
      ymax = M + 1.96 * SE
    ),
    width = 0.2, linewidth = 1
  ) +
  xlab("") +
  ylab("Percentage 'yes'") +
  scale_y_continuous(labels = scales::percent) +
  scale_x_discrete(
    #name = "\nParticipants",
    labels = c("No Susp. Affix.", "Susp. Affix.")
  ) +
  scale_color_lancet(
    name = "Conjoiner",
    labels = c("Vowel Mismatching\nOR (ya da)", "Vowel Matching\nAND (ve)")
  ) +
  theme_classic() +
  theme(text = element_text(size = 16, family = "Times"))
ggsave("avgs.png", plot = p_avg, device = "png", dpi = "retina", width = 8, height = 5)

# avg_by_item <- results %>%
#   group_by(group, type, no_sa, vowel_match_conj) %>%
#   summarize(avRT = mean(time_taken_to_answer),
#             p_yes = mean(response_yes, na.rm = T),
#             N = sum(!is.na(response_yes))  )

# reformat by-subject averages to a wide format
# avg_by_item_wide <- avg_by_item %>%
#   ungroup() %>%
#   dplyr::select(-avRT, -N,-conj, -dat) %>%
#   tidyr::spread(type, p_yes) %>%
#   mutate(delta_yada = condition_datyada - condition_yada,
#          delta_ve = condition_datve - condition_ve,
#          delta_dat = condition_datve - condition_datyada,
#          delta_nosa = condition_ve - condition_yada)

results$c_sa <- ifelse(results$no_sa == 0, .5, -.5)
results$c_mismatch <- ifelse(results$vowel_match_conj == 0, .5, -.5)

myprior <- c(
  set_prior("normal(0,1)", class = "Intercept"),
  set_prior("normal(0,1)", class = "b"),
  set_prior("normal(0,1)", class = "sd"),
  set_prior("lkj(2)", class = "cor")
)

model <- brm(
  formula = response_yes ~ c_sa * c_mismatch + (c_sa * c_mismatch | results_index) + (c_sa * c_mismatch | group),
  data = results,
  family = bernoulli("logit"),
  prior = myprior,
  chains = 4, cores = 4,
  warmup = 2000, iter = 8000,
  control = list(adapt_delta = 0.9),
  backend = "cmdstanr",
  stan_model_args = list(stanc_options = list("O1")),
  file = "./response_yes.rds"
)

model_summary(model)

bayesplot_theme_set(theme_default(base_size = 18))

color_scheme_set("gray")
model_labels <- c(
  "b_c_sa:c_mismatch" = "Interaction\n SA * OR",
  "b_c_sa" = "Suspended Affixation",
  "b_c_mismatch" = "Vowel Mismatching\nConjoiner (OR)"
)
plot_lims = c(
  "b_c_sa:c_mismatch",
  "b_c_sa",
  "b_c_mismatch"
)

?mcmc_intervals

stats_graph <- mcmc_intervals(
  model,
  pars = plot_lims,
  prob = 0.95,
  prob_outer = 0.95, inner_size = 1, point_size = 8
) +
  scale_y_discrete(
    labels = model_labels,
    # change the order, the reverse will be plotted
    limits = plot_lims
  ) + vline_0(linetype = 2) + xlab("Estimate (log-odds)")
stats_graph

ggsave("posterior.png", plot = stats_graph, device = "png", dpi = "retina", width = 8, height = 5)

#*********************

nosa_results <- results %>% filter(no_sa == T)

model_nosa <- brm(
  response_yes ~ c_mismatch + (c_mismatch | results_index) + (c_mismatch | group),
  family = bernoulli("logit"),
  data = nosa_results,
  core = 4,
  warmup = 2000,
  iter = 4000,
  file = "./model_nosa"
)

summary(model_nosa)
color_scheme_set("red")
bayesplot_theme_set(theme_default(base_size = 30, base_family = "Helvetica Neue"))
model_nosa.coef.plot <-
  mcmc_intervals(
    model_nosa,
    pars = c("b_Intercept", "b_c_mismatch"),
    point_est = "median",
    prob = 0.8, prob_outer = 0.95
  )
model_nosa.coef.plot <- model_nosa.coef.plot +
  scale_y_discrete(
    limits = unique(rev(model_nosa.coef.plot$data$parameter)),
    labels = c(
      "b_c_mismatch" = "Vowel Mismatching\nConjoiner (OR)",
      "b_Intercept" = "Intercept"
    )
  )
model_nosa.coef.plot <- model_nosa.coef.plot + vline_0(color = "blue", linetype = 2) + xlab("Estimate (log-odds)")
